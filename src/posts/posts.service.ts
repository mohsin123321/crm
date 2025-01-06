import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/users.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPosts(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: ['comments', 'author'],
    });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      author: { id: createPostDto.authorId } as User,
    });

    return await this.postsRepository.save(post);
  }

  async updatePost(updatePostDto: UpdatePostDto, id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.title = updatePostDto.title;
    post.content = updatePostDto.content;

    return await this.postsRepository.save(post);
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postsRepository.delete(post);
  }
}
