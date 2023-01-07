import { IsString, Matches, MinLength } from 'class-validator';
import { SLUG_REGEX } from 'utils/constants';

export class CreateGroupDto {
  @IsString()
  @MinLength(3, { message: 'Minimum group name length 3 characters' })
  @Matches(SLUG_REGEX, { message: 'Group name should be slug' })
  name: string;
}
