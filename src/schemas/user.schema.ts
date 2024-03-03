import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SecureUserDocument = Omit<UserDocument, 'password'>;
export type UserDocument = User & Document & { created_at: Date; updated_at: Date };
export type SecureUser = Omit<User, 'password'>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ required: true, type: SchemaTypes.String, unique: true })
  username: string;

  @Prop({ required: true, type: SchemaTypes.String, unique: true })
  email: string;

  @Prop({ required: true, type: SchemaTypes.String })
  password: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Anime' }], default: [] })
  favorites: ObjectId[];

  @Prop({ type: SchemaTypes.String, default: '' })
  refresh_token: string;

  @Prop({ type: SchemaTypes.Boolean, default: true })
  isPublic: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
