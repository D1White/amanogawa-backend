import { IsMongoId } from 'class-validator';

export class FavoritesDto {
  @IsMongoId()
  anime_id: string;
}
