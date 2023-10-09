export interface NewUserDto {
  email: string;
  password: string;
  name: string;
}

export type Providers = 'google' | 'facebook' | 'github';

export interface NewUserOAuthDto {
  email: string;
  provider: Providers;
  token: string;
  name: string;
}

export interface UserCredentialsDto {
  email: string;
  password: string;
}

export interface UserOAuthCredentialsDto {
  email: string;
  provider: Providers;
  token: string;
}
