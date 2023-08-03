import { IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { MAX_ANIME_RATING, MIN_ANIME_RATING } from 'utils/constants';

export class CreateRatingDto {
  @IsMongoId()
  anime_id: string;

  @IsNumber()
  @Min(MIN_ANIME_RATING)
  @Max(MAX_ANIME_RATING)
  rating: number;
}
