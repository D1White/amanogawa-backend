import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { MAX_ANIME_YEAR, MIN_ANIME_YEAR, SLUG_REGEX } from 'utils/constants';

import { AnimeSeason, AnimeStatus, AnimeType } from '../types';

export class CreateAnimeDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  title_english: string;

  @IsString()
  @MinLength(2)
  title_japanese: string;

  @IsString()
  @MinLength(2)
  @Matches(SLUG_REGEX, { message: 'Incorrect slug' })
  slug: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsString()
  @MinLength(5)
  synopsis: string;

  @IsString()
  @IsEnum(AnimeType)
  type: AnimeType;

  @IsString()
  @IsEnum(AnimeStatus)
  status: AnimeStatus;

  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  genres: string[];

  @IsNumber()
  @Min(MIN_ANIME_YEAR)
  @Max(MAX_ANIME_YEAR)
  year: number;

  @IsString()
  @IsEnum(AnimeSeason)
  season: AnimeSeason;

  @IsOptional()
  @IsString()
  @MinLength(2)
  group: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name_in_group: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  episodes_total: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  episodes: string[];

  @IsOptional()
  @IsNumber()
  myanime_id: number;

  @IsOptional()
  @IsNumber()
  views: number;
}
