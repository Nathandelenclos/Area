/**
 * UserObject type
 * @description Object that represents the type of a user
 */
type Oauth = {
  id: string;
  email: string;
  provider: string;
};

export interface UserObjectDto {
  /**
   * User email
   */
  email: string;
  /**
   * User name
   */
  name: string;
  /**
   * User token
   */
  token: string;
  oauth: Oauth[];
}

/**
 * UserObject
 * @description Object that represents a user
 */
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
