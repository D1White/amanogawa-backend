import { IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
export class CreateEpisodeDto {
  @IsString()
  @MinLength(3, { message: 'Minimum episode name length 3 characters' })
  name: string;

  @IsNumber()
  @Min(1, { message: 'Incorrect order' })
  order: number;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Minimum episode custom name length 2 characters' })
  custom_name: string;

  @IsUrl()
  hight: string;

  @IsUrl()
  medium: string;

  @IsUrl()
  low: string;

  @IsUrl()
  subtitles: string;
}
