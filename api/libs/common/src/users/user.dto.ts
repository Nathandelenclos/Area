export interface NewUserDto {
  email: string;
  password: string;
  name: string;
}

export interface NewUserOAuthDto {
  email: string;
  provider: 'Google' | '';
  token: string;
  name: string;
}

export interface UserCredentialsDto {
  email: string;
  password: string;
}
