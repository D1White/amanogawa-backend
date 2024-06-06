import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'schemas/comment.schema';

import { CreateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) public commentModel: Model<CommentDocument>) {}

  async getCommentsByAnimeId(animeId: string) {
    return this.commentModel
      .find({ anime: animeId })
      .sort({ created_at: -1 })
      .populate('user', 'username')
      .exec();
  }

  async create(userId: string, commentDto: CreateCommentDto) {
    const comment = new this.commentModel({ ...commentDto, user: userId });
    return comment.save();
  }

  async delete(commentId: string) {
    await this.commentModel.findByIdAndDelete(commentId).exec();
  }
}
