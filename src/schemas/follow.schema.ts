import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type FollowDocument = Follow & Document;

@Schema()
export class Follow {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  user: ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  following: ObjectId;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
