/**
 * ConfigObject
 * @description ConfigObject is the object that is used in the app
 */
export interface ConfigObjectDto {
  /**
   * Config id
   */
  id?: number;
  /**
   * Config key
   */
  key: string;
  /**
   * Config value
   */
  value: string;
}

/**
 * ConfigObject
 * @description ConfigObject is the object that is used in the app
 */
export class ConfigObject {
  data: ConfigObjectDto;

  constructor(object: ConfigObjectDto) {
    this.data = object;
  }

  get id(): number | undefined {
    return this.data.id;
  }

  get value(): string {
    return this.data.value;
  }

  get key(): string {
    return this.data.key;
  }
}
