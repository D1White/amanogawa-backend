import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { Anime, AnimeDocument, Genre, GenreDocument, Rating, RatingDocument } from 'schemas/index';
import { WEIGHTED_AVERAGE_COEFFICIENT } from 'utils';

import { AnimeFilter, CreateAnimeDto, UpdateAnimeDto } from './dto';
import { AnimeSortField, SortDirection } from './types';

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
        { $match: query },
        { $skip: filter.skip },
        { $limit: filter.limit },
        { $sort: { [filter?.sort_field]: filter.sort_direction === SortDirection.ASC ? 1 : -1 } },
        // Weighted average
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
            ratingAvg: { $avg: '$ratings.rating' },
            rating_count: { $size: '$ratings' },
          },
        },
        {
          $addFields: {
            rating: {
              $round: [
                {
                  $add: [
                    { $multiply: [WEIGHTED_AVERAGE_COEFFICIENT, '$ratingAvg'] },
                    {
                      $multiply: [
                        1 - WEIGHTED_AVERAGE_COEFFICIENT,
                        { $log: ['$rating_count', 10] },
                      ],
                    },
                  ],
                },
                2,
              ],
            },
          },
        },
        { $unset: ['ratings', 'ratingAvg'] },
      ])
      .exec();

    return {
      items: animeWithRating,
      total: count,
      limit: filter.limit,
      pages: Math.ceil(count / filter.limit),
      page: Math.floor(filter.skip / filter.limit) + 1,
    };
  }

  async findOne(id: string, full: boolean) {
    const query = isObjectIdOrHexString(id) && id.length === 24 ? { _id: id } : { slug: id };

    const anime = await this.animeModel
      .findOneAndUpdate(query, { $inc: { views: full ? 1 : 0 } }, { new: true })
      .populate(full ? 'genres episodes' : '')
      .exec();

    if (!anime) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const ratings = await this.ratingModel.find({ anime_id: anime._id }).exec();
    const ratingSum = ratings.reduce((prev, curr) => prev + curr.rating, 0);
    const ratingAvg = ratingSum / ratings.length;
    const ratingWeightedAvg =
      WEIGHTED_AVERAGE_COEFFICIENT * ratingAvg +
      (1 - WEIGHTED_AVERAGE_COEFFICIENT) * Math.log10(ratings.length);

    return {
      ...anime.toJSON(),
      rating: +ratingWeightedAvg.toFixed(2),
      rating_count: ratings.length,
    };
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
      .sort({ [AnimeSortField.createdAt]: 1 })
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

  async years() {
    const years = await this.animeModel.aggregate([
      {
        $group: {
          _id: null,
          max_year: { $max: '$year' },
          min_year: { $min: '$year' },
        },
      },
    ]);

    if (!years || !years?.[0]) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return years[0];
  }
}
