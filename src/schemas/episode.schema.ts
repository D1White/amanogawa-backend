import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type EpisodeDocument = Episode & Document & { created_at: Date };

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class Episode {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  custom_name: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  order: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  hight: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  medium: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  low: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  subtitles: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  subtitles_full: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  thumbnail: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
