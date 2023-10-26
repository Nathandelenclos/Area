import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionAppletEntity, ReactionAppletService } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionAppletEntity])],
  providers: [ReactionAppletService],
  exports: [ReactionAppletService],
})
export class ReactionAppletModule {}
