import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ActionService } from '@app/common/actions/action.service';
import { AppletConfigModule } from '@app/common/applets/configuration/applet.config.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity]), AppletConfigModule],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
