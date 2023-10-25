import { Module } from '@nestjs/common';
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '@app/common/services/service.entity';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { AppletEntity } from '@app/common/applets/applet.entity';
import { UserEntity } from '@app/common/users/user.entity';
import { AppletConfigEntity } from '@app/common/applets/configuration/applet.config.entity';
import { ServiceModule } from '@app/common/services/service.module';
import { ActionModule } from '@app/common/actions/action.module';
import { ReactionModule } from '@app/common/reactions/reaction.module';
import { AppletRequiredConfigEntity } from '@app/common/applets/required_configuration/applet.required.config.entity';

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
          ServiceEntity,
          ActionEntity,
          ReactionEntity,
          AppletEntity,
          UserEntity,
          AppletConfigEntity,
          AppletRequiredConfigEntity,
        ],
        synchronize: true,
      }),
    }),
    ServiceModule,
    ActionModule,
    ReactionModule,
  ],
  controllers: [GmailController],
  providers: [GmailService],
})
export class GmailModule {}