import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenStrategy } from 'api/auth/strategies';
import { User, UserSchema } from 'schemas/user.schema';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy],
  exports: [UserService],
})
export class UserModule {}
