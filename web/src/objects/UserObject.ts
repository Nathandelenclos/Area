type Oauth = {
  id: string;
  email: string;
  provider: string;
};
export interface UserObjectDto {
  email: string;
  name: string;
  token: string;
  oauth: Oauth[];
}

export class UserObject {
  data: UserObjectDto;

  constructor(object: UserObjectDto) {
    this.data = object;
  }

  getAccessToken(): string {
    return this.data?.token ?? "";
  }

  get name(): string {
    return this.data?.name ?? "";
  }

  get email(): string {
    return this.data?.email ?? "";
  }

  get oauth(): Oauth[] {
    return this.data?.oauth ?? [];
  }
}
