import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  @IsUUID()
  @Expose({ name: 'user_id' })
  readonly userId: string;
}
