import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppletReactionService } from './applet.reaction.service';
import { AppletReactionEntity } from './applet.reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppletReactionEntity])],
  providers: [AppletReactionService],
})
export class AppletReactionModule {}
