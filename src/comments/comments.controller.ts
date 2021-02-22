import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FindManyCommentsArgs } from './dto/find-many-comment-args.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() args: FindManyCommentsArgs) {
    const parsedArgs = {
      ...(args.take && { take: +args.take }),
      ...(args.skip && { skip: +args.skip }),
    };
    return this.commentsService.findAll(parsedArgs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDTO) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
