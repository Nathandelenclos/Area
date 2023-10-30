import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppletService } from './applet.service';
import { AppletEntity } from './applet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppletEntity])],
  providers: [AppletService],
  exports: [AppletService],
})
export class AppletModule {}
