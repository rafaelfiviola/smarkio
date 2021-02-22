import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { FindManyCommentsParsedArgs } from './dto/find-many-comment-args.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }

  async findAll(params: FindManyCommentsParsedArgs): Promise<Comment[]> {
    return this.prisma.comment.findMany(params);
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.CommentUpdateInput) {
    return this.prisma.comment.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
