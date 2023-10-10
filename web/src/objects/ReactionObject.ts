export interface ReactionObjectDto {
  id: number;
  name: string;
  description: string;
  is_available: boolean;
}

export class ReactionObject {
  data: ReactionObjectDto;

  constructor(object: ReactionObjectDto) {
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
}
