import { Controller, Get, Render } from '@nestjs/common';
import { CommentsService } from './comments/comments.service';

@Controller()
export class AppController {
  constructor(private commentsService: CommentsService) {}
  @Get()
  @Render('index')
  async root() {
    return {
      comments: await (await this.commentsService.findAll({})).reverse(),
    };
  }
}
