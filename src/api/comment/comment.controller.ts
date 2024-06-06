import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'decorators';
import { AccessTokenGuard } from 'guards';
import { FindOneMongoParams } from 'utils';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/anime/:id')
  getCommentsByAnimeId(@Param() { id: animeId }: FindOneMongoParams) {
    return this.commentService.getCommentsByAnimeId(animeId);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@UserId() id: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(id, createCommentDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { id: commentId }: FindOneMongoParams) {
    return this.commentService.delete(commentId);
  }
}
