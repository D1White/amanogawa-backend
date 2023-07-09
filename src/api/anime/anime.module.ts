import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema, Genre, GenreSchema } from 'schemas/index';

import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
