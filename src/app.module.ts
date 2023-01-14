import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeModule } from './api/anime/anime.module';
import { EpisodeModule } from './api/episode/episode.module';
import { GenreModule } from './api/genre/genre.module';
import { GroupModule } from './api/group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGODB_URL,
        ignoreUndefined: true,
      }),
    }),
    EpisodeModule,
    GenreModule,
    GroupModule,
    AnimeModule,
  ],
})
export class AppModule {}
