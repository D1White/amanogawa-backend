import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema } from 'schemas/anime.schema';

import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }])],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
