import { IsString } from 'class-validator';

export class SearchParams {
  @IsString()
  search: string;
}
