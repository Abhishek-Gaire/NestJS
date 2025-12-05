import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query, Post, Body, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const existsPosts = this.postsService.findAll();
    if (!search) return existsPosts;
    return existsPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number): PostInterface {
    return this.postsService.findOne(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostData: Omit<PostInterface, 'id' | 'createdAt'>) {
    return this.postsService.create(createPostData);
  }
}
