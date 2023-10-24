import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common/auth/auth.guard';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import MicroServiceInit from '@app/common/micro.service.init';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordController } from './controllers/discord.controller';
import { ServiceController } from './controllers/service.controller';
import { AppletController } from './controllers/applet.controller';
import {
  AppletModule,
  ActionModule,
  ReactionModule,
  ServiceModule,
  OauthModule,
  Entities,
} from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
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
    AppletModule,
    ServiceModule,
    ActionModule,
    ReactionModule,
    OauthModule,
  ],
  controllers: [
    AppController,
    AuthController,
    AppletController,
    DiscordController,
    ServiceController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MicroServiceInit.init(
      'AUTH_SERVICE',
      MicroServiceProxy.microServiceQueue.AUTH_SERVICE,
    ),
    MicroServiceInit.init(
      'DISCORD_SERVICE',
      MicroServiceProxy.microServiceQueue.DISCORD_SERVICE,
    ),
    MicroServiceInit.init(
      'SPOTIFY_SERVICE',
      MicroServiceProxy.microServiceQueue.SPOTIFY_SERVICE,
    ),
    MicroServiceInit.init(
      'INSTAGRAM_SERVICE',
      MicroServiceProxy.microServiceQueue.INSTAGRAM_SERVICE,
    ),
    MicroServiceInit.init(
      'GMAIL_SERVICE',
      MicroServiceProxy.microServiceQueue.GMAIL_SERVICE,
    ),
    MicroServiceInit.init(
      'YOUTUBE_SERVICE',
      MicroServiceProxy.microServiceQueue.YOUTUBE_SERVICE,
    ),
    MicroServiceInit.init(
      'GOOGLE_DRIVE_SERVICE',
      MicroServiceProxy.microServiceQueue.GOOGLE_DRIVE_SERVICE,
    ),
  ],
})
export class AppModule {}
