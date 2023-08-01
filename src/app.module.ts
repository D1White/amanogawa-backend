import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeModule } from './api/anime/anime.module';
import { AuthModule } from './api/auth/auth.module';
import { EpisodeModule } from './api/episode/episode.module';
import { GenreModule } from './api/genre/genre.module';
import { UserModule } from './api/user/user.module';

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
    AnimeModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
