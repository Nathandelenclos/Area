export interface NewUserDto {
  email: string;
  password: string;
  name: string;
}

export type Providers = 'google' | 'facebook' | 'github';

export interface UserCredentialsDto {
  email: string;
  password: string;
}

export interface UserOAuthCredentialsDto {
  id: string;
  email: string;
  provider: Providers;
  token: string;
}
