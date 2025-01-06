import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string): Promise<void> {
    return this.commentsService.deleteComment(id);
  }

  @Patch(':id')
  updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<Comment> {
    return this.commentsService.updateComment(updateCommentDto, id);
  }
}
