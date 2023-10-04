import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ActionService } from '@app/common/actions/action.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity])],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
