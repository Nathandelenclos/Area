import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ActionService } from '@app/common/actions/action.service';
import { AppletRequiredConfigModule } from '@app/common/applets/required_configuration/applet.required.config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionEntity]),
    AppletRequiredConfigModule,
  ],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
