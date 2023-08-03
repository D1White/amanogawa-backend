import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from 'schemas/rating.schema';

import { CreateRatingDto, UpdateRatingDto } from './dto';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) public ratingModel: Model<RatingDocument>) {}

  async findAll() {
    return this.ratingModel.find().exec();
  }

  async findOne(userId: string, animeId: string) {
    return await this.ratingModel.findOne({ user_id: userId, anime_id: animeId }).exec();
  }

  async create(userId: string, createRatingDto: CreateRatingDto) {
    const createdRating = new this.ratingModel({ user_id: userId, ...createRatingDto });
    return createdRating.save();
  }

  async update(userId: string, animeId: string, updateRatingDto: UpdateRatingDto) {
    return await this.ratingModel.findOneAndUpdate(
      { user_id: userId, anime_id: animeId },
      updateRatingDto,
      { new: true },
    );
  }
}
