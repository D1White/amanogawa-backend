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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'guards/admin-auth.guard';
import { FindOneMongoParams } from 'utils/params';

import { AnimeService } from './anime.service';
import { AnimeFilter, CreateAnimeDto, UpdateAnimeDto } from './dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  findAll(@Query() filter: AnimeFilter) {
    return this.animeService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneMongoParams) {
    return this.animeService.findOne(id, false);
  }

  @Get(':id/full')
  findOneFull(@Param() { id }: FindOneMongoParams) {
    return this.animeService.findOne(id, true);
  }

  @Get('group/:name')
  findByGroup(@Param() { name }: { name: string }) {
    return this.animeService.findByGroup(name);
  }

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  update(@Param() { id }: FindOneMongoParams, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(id, updateAnimeDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneMongoParams) {
    return this.animeService.remove(id);
  }
}
