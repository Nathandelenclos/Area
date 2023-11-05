/**
 * RequireConfigObjectDto
 * @description RequireConfigObjectDto is the object that is returned from the API
 */
export interface RequireConfigObjectDto {
  /**
   * Config id
   */
  id: number;
  /**
   * Config name
   */
  name: string;
  /**
   * Config description
   */
  description: string;
  /**
   * Config key
   */
  key: string;
  /**
   * Config type
   */
  type: string;
}

/**
 * RequireConfigObject
 * @description RequireConfigObject is the object that is used in the app
 */
export class RequireConfigObject {
  data: RequireConfigObjectDto;

  constructor(object: RequireConfigObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get description(): string {
    return this.data.description;
  }

  get key(): string {
    return this.data.key;
  }

  get type(): string {
    return this.data.type;
  }
}
