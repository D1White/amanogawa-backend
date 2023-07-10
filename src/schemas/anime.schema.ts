import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimeSeason, AnimeStatus, AnimeType } from 'api/anime/types';
import mongoose, { Document, ObjectId } from 'mongoose';

export type AnimeDocument = Anime & Document & { created_at: Date; updated_at: Date };

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
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

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  synopsis: string;

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

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genres: ObjectId[];

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  year: number;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    enum: AnimeSeason,
  })
  season: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  group: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  name_in_group: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  episodes_total: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }] })
  episodes: ObjectId[];

  @Prop({ type: mongoose.SchemaTypes.Number })
  myanime_id: number;

  @Prop({ type: mongoose.SchemaTypes.Number, default: 0 })
  score: number;

  @Prop({ type: mongoose.SchemaTypes.Number, default: 0 })
  views: number;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
