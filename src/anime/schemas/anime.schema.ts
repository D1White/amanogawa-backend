import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Anime {
  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  current: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  planning: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  completed: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  paused: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  dropped: number[];
}

export const ListSchema = SchemaFactory.createForClass(Anime);
