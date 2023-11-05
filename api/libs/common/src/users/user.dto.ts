import { UserOAuthCredentialsDto } from '@app/common/OAuth/oauth.dto';

export interface UserDto {
  id?: number;
  email: string;
  name?: string;
}

export type Providers = 'google' | 'facebook' | 'github';

export interface UserNativeCredentialsDto extends UserDto {
  password: string;
}

export type UserCredentialsDto =
  | UserNativeCredentialsDto
  | UserOAuthCredentialsDto;

export interface UserLoggedInDto extends UserDto {
  token: string;
}
