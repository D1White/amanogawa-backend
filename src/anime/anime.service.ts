import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAnimeDto, UpdateAnimeDto } from './dto';
import { Anime, AnimeDocument } from './schemas/anime.schema';

@Injectable()
export class AnimeService {
  constructor(@InjectModel(Anime.name) public animeModel: Model<AnimeDocument>) {}

  async findAll() {
    return this.animeModel.find().exec();
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
