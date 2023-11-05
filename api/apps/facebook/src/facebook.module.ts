import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ActionModule,
  AppletConfigModule,
  Entities,
  OauthModule,
  ReactionModule,
  ServiceModule,
} from '@app/common';

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
        entities: Entities,
        synchronize: true,
      }),
    }),
    ServiceModule,
    ActionModule,
    ReactionModule,
    AppletConfigModule,
    OauthModule,
  ],
  controllers: [FacebookController],
  providers: [FacebookService],
})
export class FacebookModule {}
