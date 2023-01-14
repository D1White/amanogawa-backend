import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimeSeason, AnimeStatus, AnimeType } from 'api/anime/types';
import mongoose, { Document, ObjectId } from 'mongoose';

export type AnimeDocument = Anime & Document;

@Schema()
export class Anime {
  @Prop({ required: true, unique: true, type: mongoose.SchemaTypes.String })
  title: string;

  @Prop({ required: true, unique: true, type: mongoose.SchemaTypes.String })
  title_english: string;

  @Prop({ required: true, unique: true, type: mongoose.SchemaTypes.String })
  title_japanese: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  slug: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  image: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    enum: AnimeType,
  })
  type: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    enum: AnimeStatus,
  })
  status: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  views: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  synopsis: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  year: number;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    enum: AnimeSeason,
  })
  season: string;

  @Prop({ type: mongoose.SchemaTypes.Number })
  myanime_id: number;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genres: ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }] })
  episodes: ObjectId[];

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Group' })
  group: ObjectId;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  created_at: string;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
