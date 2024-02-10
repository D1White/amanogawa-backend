import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument, User, UserDocument } from 'schemas/index';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Anime.name) public animeModel: Model<AnimeDocument>,
    @InjectModel(User.name) public userModel: Model<UserDocument>,
  ) {}

  async findAnime(name: string) {
    const searchRegex = new RegExp(name, 'i');
    const query = {
      $or: [
        { title: searchRegex },
        { title_english: searchRegex },
        { title_japanese: searchRegex },
      ],
      $sort: { title: 1 },
    };

    const selectedFields = ['title', 'slug', 'image', 'type', 'status', 'year'];

    return this.animeModel.find(query).select(selectedFields).limit(5).exec();
  }

  async findUsers(username: string) {
    const selectedFields = ['username'];

    return this.userModel
      .find({ username: { $regex: username, $options: 'i' }, isPublic: true })
      .sort({ username: 1 })
      .select(selectedFields)
      .limit(5)
      .exec();
  }

  async search(value: string) {
    const anime = await this.findAnime(value);
    const users = await this.findUsers(value);

    return { anime, users };
  }
}
