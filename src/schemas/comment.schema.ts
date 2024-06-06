import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type CommentDocument = Comment & Document & { created_at: Date };

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Comment {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  user: ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Anime' })
  anime: ObjectId;

  @Prop({ required: true, type: SchemaTypes.String })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
