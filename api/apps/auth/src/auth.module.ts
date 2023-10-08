import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/common/users/user.module';
import { UserEntity } from '@app/common/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AppletEntity } from '@app/common/applets/applet.entity';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ServiceEntity } from '@app/common/services/service.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { AppletConfigEntity } from '@app/common/applets/configuration/applet.config.entity';
import { AppletModule } from '@app/common/applets/applet.module';

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
          ServiceEntity,
          ReactionEntity,
          AppletConfigEntity,
        ],
        synchronize: true,
      }),
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
    UserModule,
    AppletModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
