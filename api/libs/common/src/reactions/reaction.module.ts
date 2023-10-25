import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ReactionService } from '@app/common/reactions/reaction.service';
import { AppletConfigModule } from '@app/common/applets/configuration/applet.config.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionEntity]), AppletConfigModule],
  providers: [ReactionService],
  exports: [ReactionService],
})
export class ReactionModule {}
