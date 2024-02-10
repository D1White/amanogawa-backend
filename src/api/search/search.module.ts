import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema, User, UserSchema } from 'schemas/index';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
