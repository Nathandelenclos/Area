import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AppletEntity } from '@app/common/applets/applet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AppletEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
