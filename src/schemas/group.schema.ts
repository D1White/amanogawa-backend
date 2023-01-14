import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true, unique: true, type: mongoose.SchemaTypes.String })
  name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
