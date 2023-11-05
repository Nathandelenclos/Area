import { Module } from '@nestjs/common';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Entities,
  ServiceModule,
  ActionModule,
  ReactionModule,
  AppletModule,
  AppletConfigModule,
  ActionAppletModule,
  ReactionAppletModule,
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
    AppletModule,
    ServiceModule,
    ActionModule,
    ReactionModule,
    AppletConfigModule,
    ActionAppletModule,
    ReactionAppletModule,
  ],
  controllers: [TimerController],
  providers: [TimerService],
})
export class TimerModule {}
