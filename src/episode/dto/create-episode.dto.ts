import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEpisodeDto {
  @IsNumber()
  order: number;

  @IsOptional()
  @IsNumber()
  name: string;

  @IsString()
  @IsUrl()
  hight: string;

  @IsString()
  @IsUrl()
  medium: string;

  @IsString()
  @IsUrl()
  low: string;

  @IsString()
  @IsUrl()
  subtitles: string;
}
