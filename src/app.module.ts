import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeModule } from './anime/anime.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodeModule } from './episode/episode.module';
import { GenreModule } from './genre/genre.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    EpisodeModule,
    GenreModule,
    GroupModule,
    AnimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
