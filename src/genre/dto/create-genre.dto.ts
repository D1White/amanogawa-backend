import { IsLowercase, IsString, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @MinLength(3, {
    message: 'Minimum name length 3 characters',
  })
  name: string;

  @IsString()
  @MinLength(3, { message: 'Minimum slug length 3 characters' })
  @IsLowercase({ message: 'Slug should be lowercase' })
  slug: string;
}
