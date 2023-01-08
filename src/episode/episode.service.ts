import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateEpisodeDto, UpdateEpisodeDto } from './dto';
import { Episode, EpisodeDocument } from './schemas/episode.schema';

@Injectable()
export class EpisodeService {
  constructor(@InjectModel(Episode.name) public episodeModel: Model<EpisodeDocument>) {}

  async findAll() {
    return this.episodeModel.find().exec();
  }

  async findOne(id: string) {
    const episode = await this.episodeModel.findById(id).exec();

    if (!episode) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return episode;
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { created_at: new Date().toISOString(), ...createEpisodeDto };

    const createdEpisode = new this.episodeModel(newEpisode);
    return createdEpisode.save();
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeModel.findByIdAndUpdate(id, updateEpisodeDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.episodeModel.findByIdAndDelete(id);
  }
}
