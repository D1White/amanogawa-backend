import { Injectable } from '@nestjs/common';
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
