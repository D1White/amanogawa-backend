import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenStrategy } from 'api/auth/strategies';
import { UserModule } from 'api/user/user.module';
import { Rating, RatingSchema } from 'schemas/rating.schema';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]), UserModule],
  controllers: [RatingController],
  providers: [RatingService, AccessTokenStrategy],
})
export class RatingModule {}
