import { Providers } from '@app/common/users/user.dto';
import { UserEntity } from '@app/common/users/user.entity';

export interface OauthDto {
  email: string;
  token: string;
  providerId: string;
  provider: Providers;
  user: UserEntity;
}
