import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  user_id: ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Anime' })
  anime_id: ObjectId;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
