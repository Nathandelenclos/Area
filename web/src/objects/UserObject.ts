export interface UserObjectDto {
  email: string;
  name: string;
  token: string;
}

export class UserObject {
  data: UserObjectDto;

  constructor(object: UserObjectDto) {
    this.data = object;
  }

  getAccessToken(): string {
    return this.data?.token ?? "";
  }
}
