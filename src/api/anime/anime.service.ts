import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument, Genre, GenreDocument } from 'schemas/index';

import { AnimeFilter, CreateAnimeDto, UpdateAnimeDto } from './dto';
import { SortDirection } from './types';

@Injectable()
export class AnimeService {
  constructor(
    @InjectModel(Anime.name) public animeModel: Model<AnimeDocument>,
    @InjectModel(Genre.name) public genreModel: Model<GenreDocument>,
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
      year: filter?.year,
      genres: genresIds.length > 0 ? { $in: genresIds } : undefined,
    };

    const count = await this.animeModel.count(query);

    const anime = await this.animeModel
      .find(query, '-__v', {
        skip: filter.skip,
        limit: filter.limit,
        sort: {
          [filter?.sort_field]: filter.sort_direction === SortDirection.ASC ? 1 : -1,
        },
      })
      .exec();

    return {
      items: anime,
      total: count,
      limit: filter.limit,
      pages: Math.ceil(count / filter.limit),
      page: filter.skip / filter.limit + 1,
    };
  }

  async findOne(id: string, full: boolean) {
    return this.animeModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate(full ? 'genres episodes' : '')
      .exec();
  }

  async create(createAnimeDto: CreateAnimeDto) {
    const newAnime = { created_at: new Date().toISOString(), ...createAnimeDto };
    const createdAnime = new this.animeModel(newAnime);
    return createdAnime.save();
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto) {
    return this.animeModel.findByIdAndUpdate(id, updateAnimeDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.animeModel.findByIdAndDelete(id);
  }
}
