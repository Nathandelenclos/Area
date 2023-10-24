import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ReactionService } from '@app/common/reactions/reaction.service';
import { AppletRequiredConfigModule } from '@app/common/applets/required_configuration/applet.required.config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionEntity]),
    AppletRequiredConfigModule,
  ],
  providers: [ReactionService],
  exports: [ReactionService],
})
export class ReactionModule {}
