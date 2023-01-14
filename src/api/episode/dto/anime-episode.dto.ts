import { IsMongoId } from 'class-validator';

export class AnimeEpisodeDto {
  @IsMongoId()
  anime_id: string;

  @IsMongoId()
  episode_id: string;
}
