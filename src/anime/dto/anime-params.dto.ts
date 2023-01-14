import { PartialType } from '@nestjs/mapped-types';
import { AnimeSeason, AnimeSortField, AnimeStatus, AnimeType, SortDirection } from 'anime/types';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { DEFAULT_LIMIT } from 'utils/constants';

import { maxAnimeYear, minAnimeYear } from './create-anime.dto';

class AnimeParams {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip = 0;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit = DEFAULT_LIMIT;

  @IsEnum(AnimeType)
  type: AnimeType;

  @IsEnum(AnimeStatus)
  status: AnimeStatus;

  @IsEnum(AnimeSeason)
  season: AnimeSeason;

  @IsInt()
  @Min(minAnimeYear)
  @Max(maxAnimeYear)
  @Type(() => Number)
  year: number;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsString()
  search: string;

  @IsEnum(AnimeSortField)
  sort_field: AnimeSortField;

  @IsEnum(SortDirection)
  sort_direction = SortDirection.DESC;
}

export class AnimeFilter extends PartialType(AnimeParams) {}
