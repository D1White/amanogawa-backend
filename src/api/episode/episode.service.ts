import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument, Episode, EpisodeDocument } from 'schemas';

import { AnimeEpisodeDto, CreateEpisodeDto, UpdateEpisodeDto } from './dto';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode.name) public episodeModel: Model<EpisodeDocument>,
    @InjectModel(Anime.name) public animeModel: Model<AnimeDocument>,
  ) {}

  async findAll() {
    return this.episodeModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string) {
    const episode = await this.episodeModel.findById(id).exec();

    if (!episode) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const anime = await this.animeModel
      .findOne({ episodes: { $in: id } }, ['title', 'slug', 'episodes', 'created_at'])
      .populate('episodes')
      .exec();

    return { ...episode.toJSON(), anime };
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const createdEpisode = new this.episodeModel(createEpisodeDto);
    return createdEpisode.save();
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeModel.findByIdAndUpdate(id, updateEpisodeDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.episodeModel.findByIdAndDelete(id);
  }

  async addToAnime(animeEpisodeDto: AnimeEpisodeDto) {
    const { anime_id, episode_id } = animeEpisodeDto;

    const anime = await this.animeModel.findById(anime_id).exec();
    if (!anime) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const animeHasEpisode = anime.episodes.some((episode) => episode.toString() === episode_id);
    if (animeHasEpisode) {
      throw new HttpException('This episode has already been added', HttpStatus.BAD_REQUEST);
    }

    return this.animeModel
      .findByIdAndUpdate(anime_id, { $push: { episodes: episode_id } }, { new: true })
      .exec();
  }

  async removeFromAnime(animeEpisodeDto: AnimeEpisodeDto) {
    const { anime_id, episode_id } = animeEpisodeDto;

    return this.animeModel
      .findByIdAndUpdate(anime_id, { $pull: { episodes: episode_id } }, { new: true })
      .exec();
  }
}
