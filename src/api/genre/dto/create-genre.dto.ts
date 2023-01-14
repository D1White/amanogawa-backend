import { IsString, Matches, MinLength } from 'class-validator';
import { SLUG_REGEX } from 'utils/constants';

export class CreateGenreDto {
  @IsString()
  @MinLength(3, {
    message: 'Minimum name length 3 characters',
  })
  name: string;

  @IsString()
  @MinLength(3, { message: 'Minimum slug length 3 characters' })
  @Matches(SLUG_REGEX, { message: 'Incorrect slug' })
  slug: string;
}
