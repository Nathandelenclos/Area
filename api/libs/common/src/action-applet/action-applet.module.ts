import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionAppletEntity } from '@app/common';
import { ActionAppletService } from '@app/common/action-applet/action-applet.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActionAppletEntity])],
  providers: [ActionAppletService],
  exports: [ActionAppletService],
})
export class ActionAppletModule {}
