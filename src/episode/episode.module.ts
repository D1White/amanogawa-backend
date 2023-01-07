import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { Episode, EpisodeSchema } from './schemas/episode.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }])],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
