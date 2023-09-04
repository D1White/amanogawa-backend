import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument, Genre, GenreDocument, Rating, RatingDocument } from 'schemas/index';

import { AnimeFilter, CreateAnimeDto, UpdateAnimeDto } from './dto';
import { SortDirection } from './types';

@Injectable()
export class AnimeService {
  constructor(
    @InjectModel(Anime.name) public animeModel: Model<AnimeDocument>,
    @InjectModel(Genre.name) public genreModel: Model<GenreDocument>,
    @InjectModel(Rating.name) public ratingModel: Model<RatingDocument>,
  ) {}

  async findAll(filter: AnimeFilter) {
    const searchRegex = new RegExp(filter?.search, 'i');
    let genresIds: string[] = [];

    if (filter?.genres?.length > 0) {
      const genres = await this.genreModel.find({ slug: { $in: filter.genres } }).exec();

      if (genres) {
        genresIds = genres.map((genre) => genre._id);
      }
    }

    const query = {
      $or: [
        { title: searchRegex },
        { title_english: searchRegex },
        { title_japanese: searchRegex },
      ],
      type: filter?.type,
      status: filter?.status,
      season: filter?.season,
      year:
        filter?.min_year || filter?.max_year
          ? {
              ...(filter?.min_year && { $gte: filter?.min_year }),
              ...(filter?.max_year && { $lte: filter?.max_year }),
            }
          : undefined,
      genres: genresIds.length > 0 ? { $in: genresIds } : undefined,
    };

    const count = await this.animeModel.count(query);

    const animeWithRating = await this.animeModel
      .aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'anime_id',
            as: 'ratings',
          },
        },
        {
          $addFields: {
            rating: { $avg: '$ratings.rating' },
          },
        },
        { $unset: 'ratings' },
      ])
      .skip(filter.skip)
      .limit(filter.limit)
      .sort({ [filter?.sort_field]: filter.sort_direction === SortDirection.ASC ? 1 : -1 })
      .exec();

    return {
      items: animeWithRating,
      total: count,
      limit: filter.limit,
      pages: Math.ceil(count / filter.limit),
      page: filter.skip / filter.limit + 1,
    };
  }

  async findOne(id: string, full: boolean) {
    const anime = await this.animeModel
      .findByIdAndUpdate(id, { $inc: { views: full ? 1 : 0 } }, { new: true })
      .populate(full ? 'genres episodes' : '')
      .exec();

    const ratings = await this.ratingModel.find({ anime_id: anime._id }).exec();
    const ratingSum = ratings.reduce((prev, curr) => prev + curr.rating, 0);
    const ratingAvg = ratingSum / ratings.length;

    return { ...anime.toJSON(), rating: ratingAvg };
  }

  async findByGroup(groupName: string) {
    return this.animeModel
      .find({ group: groupName }, [
        'title',
        'slug',
        'year',
        'season',
        'group',
        'name_in_group',
        'created_at',
      ])
      .exec();
  }

  async create(createAnimeDto: CreateAnimeDto) {
    const createdAnime = new this.animeModel(createAnimeDto);
    return createdAnime.save();
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto) {
    return this.animeModel.findByIdAndUpdate(id, updateAnimeDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.animeModel.findByIdAndDelete(id);
  }
}
