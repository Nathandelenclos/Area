import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionAppletEntity } from '@app/common/reaction-applet/reaction-applet.entity';
import { ReactionAppletService } from '@app/common/reaction-applet/reaction-applet.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionAppletEntity])],
  providers: [ReactionAppletService],
  exports: [ReactionAppletService],
})
export class ReactionAppletModule {}
