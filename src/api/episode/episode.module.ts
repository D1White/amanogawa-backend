import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema, Episode, EpisodeSchema } from 'schemas';

import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }]),
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
