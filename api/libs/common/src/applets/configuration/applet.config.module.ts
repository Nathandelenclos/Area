import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppletConfigService } from './applet.config.service';
import { AppletConfigEntity } from './applet.config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppletConfigEntity])],
  providers: [AppletConfigService],
  exports: [AppletConfigService],
})
export class AppletConfigModule {}
