import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenStrategy } from 'api/auth/strategies';
import { UserModule } from 'api/user/user.module';
import { Comment, CommentSchema } from 'schemas/comment.schema';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), UserModule],
  controllers: [CommentController],
  providers: [CommentService, AccessTokenStrategy],
})
export class CommentModule {}
