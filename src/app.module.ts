import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, CommentsController],
  providers: [AppService, CommentsService, PrismaService],
})
export class AppModule {}
