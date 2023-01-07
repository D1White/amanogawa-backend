import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type EpisodeDocument = Episode & Document;

@Schema()
export class Episode {
  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  order: number;

  @Prop({ type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  hight: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  medium: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  low: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  subtitles: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
