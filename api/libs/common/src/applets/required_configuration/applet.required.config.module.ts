import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppletRequiredConfigEntity } from '@app/common/applets/required_configuration/applet.required.config.entity';
import { AppletRequiredConfigService } from '@app/common/applets/required_configuration/applet.required.config.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppletRequiredConfigEntity])],
  providers: [AppletRequiredConfigService],
  exports: [AppletRequiredConfigService],
})
export class AppletRequiredConfigModule {}
