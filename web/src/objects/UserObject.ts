/**
 * UserObject type
 * @description Object that represents the type of a user
 */
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
}
