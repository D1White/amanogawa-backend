import { IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
export class CreateEpisodeDto {
  @IsString()
  @MinLength(3, { message: 'Minimum episode name length 3 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Minimum episode custom name length 2 characters' })
  custom_name: string;

  @IsNumber()
  @Min(0, { message: 'Incorrect order' })
  order: number;

  @IsUrl()
  hight: string;

  @IsOptional()
  @IsUrl()
  medium: string;

  @IsOptional()
  @IsUrl()
  low: string;

  @IsUrl()
  subtitles: string;

  @IsOptional()
  @IsUrl()
  subtitles_full: string;
}
