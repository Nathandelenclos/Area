import { Providers, UserDto } from '@app/common/users/user.dto';
import { UserEntity } from '@app/common/users/user.entity';

export interface UserOAuthCredentialsDto extends UserDto {
  provider: Providers;
  refreshToken?: string;
  providerId: string;
  accessToken?: string;
  user?: UserEntity;
  code?: string;
  redirect_uri?: string;
}
