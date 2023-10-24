import { Module } from '@nestjs/common';
import { GoogleDriveController } from './google_drive.controller';
import { GoogleDriveService } from './google_drive.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ActionModule,
  ReactionModule,
  ServiceModule,
  Entities,
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
  ],
  controllers: [GoogleDriveController],
  providers: [GoogleDriveService],
})
export class GoogleDriveModule {}
