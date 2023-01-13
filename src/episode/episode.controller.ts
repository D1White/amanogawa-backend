import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindOneMongoParams } from 'utils/params';

import { AnimeEpisodeDto, CreateEpisodeDto, UpdateEpisodeDto } from './dto';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneMongoParams) {
    return this.episodeService.findOne(id);
  }

  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto);
  }

  @Patch(':id')
  update(@Param() { id }: FindOneMongoParams, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneMongoParams) {
    return this.episodeService.remove(id);
  }

  @Post('/add')
  addToAnime(@Body() animeEpisodeDto: AnimeEpisodeDto) {
    return this.episodeService.addToAnime(animeEpisodeDto);
  }

  @Post('/remove')
  removeFromAnime(@Body() animeEpisodeDto: AnimeEpisodeDto) {
    return this.episodeService.removeFromAnime(animeEpisodeDto);
  }
}
