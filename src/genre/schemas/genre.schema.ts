import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Prop({ required: [true, 'password required'], unique: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({ required: [true, 'password required'], unique: true, type: mongoose.SchemaTypes.String })
  slug: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
