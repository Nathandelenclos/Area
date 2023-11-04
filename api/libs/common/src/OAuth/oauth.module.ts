import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthEntity } from '@app/common/OAuth/oauth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OauthService } from '@app/common/OAuth/oauth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OauthEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
    }),
  ],
  providers: [OauthService],
  exports: [OauthService],
})
export class OauthModule {}
