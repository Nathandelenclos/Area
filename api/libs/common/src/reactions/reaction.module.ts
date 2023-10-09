import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ReactionService } from '@app/common/reactions/reaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionEntity])],
  providers: [ReactionService],
  exports: [ReactionService],
})
export class ReactionModule {}
