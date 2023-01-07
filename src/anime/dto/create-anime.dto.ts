import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
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
  @Length(4, 4)
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

  @IsArray()
  @ArrayNotEmpty()
  episodes: string[];

  @IsOptional()
  @IsMongoId()
  group: string;
}
