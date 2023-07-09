import { PartialType } from '@nestjs/mapped-types';
import {
  AnimeSeason,
  AnimeSortField,
  AnimeStatus,
  AnimeType,
  SortDirection,
} from 'api/anime/types';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { DEFAULT_LIMIT, MAX_ANIME_YEAR, MIN_ANIME_YEAR } from 'utils/constants';

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
  @Min(MIN_ANIME_YEAR)
  @Max(MAX_ANIME_YEAR)
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
