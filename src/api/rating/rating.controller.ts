import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'decorators';
import { AccessTokenGuard } from 'guards';
import { FindOneMongoParams } from 'utils';

import { CreateRatingDto, UpdateRatingDto } from './dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param() { id: animeId }: FindOneMongoParams, @UserId() userId: string) {
    return this.ratingService.findOne(userId, animeId);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@UserId() id: string, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.createOrUpdate(id, createRatingDto);
  }
}
