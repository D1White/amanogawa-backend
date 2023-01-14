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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'utils/auth.guard';
import { FindOneMongoParams } from 'utils/params';

import { AnimeEpisodeDto, CreateEpisodeDto, UpdateEpisodeDto } from './dto';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param() { id }: FindOneMongoParams) {
    return this.episodeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param() { id }: FindOneMongoParams, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneMongoParams) {
    return this.episodeService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  addToAnime(@Body() animeEpisodeDto: AnimeEpisodeDto) {
    return this.episodeService.addToAnime(animeEpisodeDto);
  }

  @UseGuards(AuthGuard)
  @Post('/remove')
  removeFromAnime(@Body() animeEpisodeDto: AnimeEpisodeDto) {
    return this.episodeService.removeFromAnime(animeEpisodeDto);
  }
}
