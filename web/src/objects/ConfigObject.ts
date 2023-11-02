export interface ConfigObjectDto {
  id: number;
  key: string;
  value: string;
}

export class ConfigObject {
  data: ConfigObjectDto;

  constructor(object: ConfigObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get value(): string {
    return this.data.value;
  }

  get key(): string {
    return this.data.key;
  }
}
