import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Entities,
  AppletModule as AppletCommonModule,
  ActionAppletModule,
  ReactionAppletModule,
  AppletConfigModule,
  ActionModule,
  ReactionModule,
} from '@app/common';
import { AppletController } from './applet.controller';
import { AppletService } from './applet.service';

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
        autoLoadEntities: true,
        entities: Entities,
        synchronize: true,
      }),
    }),
    AppletCommonModule,
    ActionAppletModule,
    ReactionAppletModule,
    AppletConfigModule,
    ActionModule,
    ReactionModule,
  ],
  controllers: [AppletController],
  providers: [AppletService],
})
export class AppletModule {}
