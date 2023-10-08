import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { AppletEntity } from '@app/common/applets/applet.entity';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ServiceEntity } from '@app/common/services/service.entity';
import { AppletConfigEntity } from '@app/common/applets/configuration/applet.config.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [
          UserEntity,
          AppletEntity,
          ActionEntity,
          ReactionEntity,
          ServiceEntity,
          AppletConfigEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
  controllers: [CronController],
  providers: [CronService],
})
export class CronModule {}
