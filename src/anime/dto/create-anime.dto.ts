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
import { SLUG_REGEX } from 'utils/constants';

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
  @IsEnum(AnimeType)
  type: AnimeType;

  @IsString()
  @IsEnum(AnimeStatus)
  status: AnimeStatus;

  @IsNumber()
  views: number;

  @IsString()
  @MinLength(5)
  synopsis: string;

  @IsNumber()
  @Min(1900)
  @Max(3000)
  year: number;

  @IsString()
  @IsEnum(AnimeSeason)
  season: AnimeSeason;

  @IsOptional()
  @IsNumber()
  myanime_id: number;

  @IsArray()
  @ArrayNotEmpty()
  genres: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  episodes: string[];

  @IsOptional()
  @IsMongoId()
  group: string;
}
