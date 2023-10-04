import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppletController } from './applet.controller';
import { AppletService } from './applet.service';
import { AppletEntity } from './applet.entity';
import { AppletConfigModule } from './configuration/applet.config.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppletEntity]), AppletConfigModule],
  controllers: [AppletController],
  providers: [AppletService],
})
export class AppletModule {}
