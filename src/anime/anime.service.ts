import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeFilter, CreateAnimeDto, UpdateAnimeDto } from './dto';
import { Anime, AnimeDocument } from './schemas/anime.schema';
import { SortDirection } from './types';

@Injectable()
export class AnimeService {
  constructor(@InjectModel(Anime.name) public animeModel: Model<AnimeDocument>) {}

  async findAll(filter: AnimeFilter) {
    const searchRegex = new RegExp(filter?.search, 'i');

    const count = await this.animeModel.count();

    const anime = await this.animeModel
      .find(
        {
          $or: [
            { title: searchRegex },
            { title_english: searchRegex },
            { title_japanese: searchRegex },
          ],
          type: filter?.type,
          status: filter?.status,
          season: filter?.season,
          year: filter?.year,
        },
        '-__v',
        {
          skip: filter.skip,
          limit: filter.limit,
          sort: {
            [filter?.sort_field]: filter.sort_direction === SortDirection.ASC ? 1 : -1,
          },
        },
      )
      .populate({
        path: 'genres',
        match: filter?.genres?.length > 0 ? { slug: { $in: filter?.genres } } : {},
        select: 'name slug',
      })
      .exec();

    const filtredAnime = anime.filter((item) => item.genres.length > 0);

    return {
      items: filtredAnime,
      total: count,
      limit: filter.limit,
      pages: Math.ceil(count / filter.limit),
      page: filter.skip / filter.limit + 1,
    };
  }

  async findOne(id: string, full: boolean) {
    const anime = await this.animeModel
      .findById(id)
      .populate(full ? 'genres episodes' : '')
      .exec();

    if (!anime) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.animeModel
      .findByIdAndUpdate(id, { views: anime.views + 1 }, { new: true })
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
