import { IsString, Matches, MinLength } from 'class-validator';
import { SLUG_REGEX } from 'utils/constants';

export class CreateGenreDto {
  @IsString()
  @MinLength(2, {
    message: 'Minimum name length 2 characters',
  })
  name: string;

  @IsString()
  @MinLength(2, { message: 'Minimum slug length 2 characters' })
  @Matches(SLUG_REGEX, { message: 'Incorrect slug' })
  slug: string;
}
