import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppletService } from './applet.service';
import { AppletEntity } from './applet.entity';
import { AppletConfigModule } from './configuration/applet.config.module';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppletEntity]), AppletConfigModule],
  providers: [AppletService],
  exports: [AppletService],
})
export class AppletModule {}
