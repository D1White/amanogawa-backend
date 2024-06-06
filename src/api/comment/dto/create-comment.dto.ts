import { IsMongoId, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  anime: string;

  @IsString()
  @MinLength(1)
  text: number;
}
