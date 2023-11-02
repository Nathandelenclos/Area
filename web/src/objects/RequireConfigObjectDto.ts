export interface RequireConfigObjectDto {
  id: number;
  name: string;
  description: string;
  key: string;
  type: string;
}

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
