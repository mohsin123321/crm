import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  @IsUUID()
  @Expose({ name: 'post_id' })
  readonly postId: string;

  @IsNotEmpty()
  @IsUUID()
  @Expose({ name: 'user_id' })
  readonly userId: string;
}
