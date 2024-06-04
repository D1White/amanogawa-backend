import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenStrategy } from 'api/auth/strategies';
import { Follow, FollowSchema } from 'schemas/follow.schema';
import { User, UserSchema } from 'schemas/user.schema';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy],
  exports: [UserService],
})
export class UserModule {}
