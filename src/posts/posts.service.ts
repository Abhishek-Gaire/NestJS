import { Injectable, NotFoundException } from '@nestjs/common';
import type { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Content 1',
      authorName: 'Author 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  create(postData: Omit<Post, 'id' | 'createdAt'>): Post {
    const post: Post = {
      id: this.getNextId(),
      createdAt: new Date(),
      ...postData,
    };
    this.posts.push(post);
    return post;
  }

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((p) => p.id)) + 1
      : 1;
  }
}
