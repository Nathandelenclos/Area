import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AppletModule,
  ActionModule,
  ReactionModule,
  ServiceModule,
  OauthModule,
  Entities,
  MicroServiceInit,
  MicroServiceProxy,
  AuthGuard,
} from '@app/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { ServiceController } from './controllers/service.controller';
import { AppletController } from './controllers/applet.controller';

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
  ],
})
export class AppModule {}
