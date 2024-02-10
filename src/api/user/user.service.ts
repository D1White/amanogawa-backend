import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';

import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hash(createUserDto.password, 7);
    const createdUser = new this.userModel({ ...createUserDto, password: hashPassword });
    return createdUser.save();
  }

  async findById(id: string, full?: boolean) {
    return this.userModel
      .findById(id)
      .select('-password')
      .populate(full ? 'favorites' : '')
      .exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async getPublicUser(username: string, withFavorites?: boolean) {
    const user = await this.userModel
      .findOne({ username })
      .select(`username isPublic isFavoritesPublic ${withFavorites ? 'favorites' : ''}`)
      .populate(withFavorites ? 'favorites' : '')
      .exec();

    if (!user?.isPublic) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, updatedAtSkip?: boolean) {
    const hashPassword = updateUserDto?.password ? await hash(updateUserDto.password, 7) : '';

    return this.userModel
      .findByIdAndUpdate(
        id,
        { ...updateUserDto, ...(hashPassword && { password: hashPassword }) },
        { new: true, timestamps: !updatedAtSkip },
      )
      .select('-password')
      .exec();
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    return await this.update(userId, { refresh_token: refreshToken }, true);
  }

  async getFavorites(id: string) {
    const user = await this.findById(id, true);
    return user?.favorites || [];
  }

  async getPublicUserFavorites(username: string) {
    const user = await this.getPublicUser(username, true);
    return user?.isFavoritesPublic && user?.favorites ? user?.favorites : [];
  }

  async addAnimeToFavorites(userId: string, animeId: string) {
    this.userModel.findByIdAndUpdate(userId, { $addToSet: { favorites: animeId } }).exec();
  }

  async removeAnimeFromFavorites(userId: string, animeId: string) {
    this.userModel.findByIdAndUpdate(userId, { $pull: { favorites: animeId } }).exec();
  }
}
