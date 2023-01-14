import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from 'schemas/genre.schema';

import { CreateGenreDto, UpdateGenreDto } from './dto';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre.name) public genreModel: Model<GenreDocument>) {}

  async findAll() {
    return this.genreModel.find().exec();
  }

  async create(createGenreDto: CreateGenreDto) {
    const createdGenre = new this.genreModel(createGenreDto);
    return createdGenre.save();
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    return this.genreModel.findByIdAndUpdate(id, updateGenreDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.genreModel.findByIdAndDelete(id);
  }
}
