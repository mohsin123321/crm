import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.entity';
import { Post } from 'src/posts/posts.entity';
import { User } from 'src/users/entities/users.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      post: { id: createCommentDto.postId } as Post,
      user: { id: createCommentDto.userId } as User,
    });

    return await this.commentsRepository.save(comment);
  }

  async deleteComment(id: string): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.commentsRepository.delete(comment);
  }

  async updateComment(
    updateCommentDto: UpdateCommentDto,
    id: string,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== updateCommentDto.userId) {
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );
    }

    comment.content = updateCommentDto.content;

    return await this.commentsRepository.save(comment);
  }
}
