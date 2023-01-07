import { IsMongoId } from 'class-validator';

export class FindOneMongoParams {
  @IsMongoId()
  id: string;
}
