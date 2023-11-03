export interface ReactionObjectDto {
  id: number;
  key: string;
  name: string;
  description: string;
  is_available: boolean;
  cmd: string;
}

export interface ReactionAppletObjectDto {
  id: number;
  reaction: ReactionObjectDto;
}

export class ReactionAppletObject {
  data: ReactionAppletObjectDto;

  constructor(object: ReactionAppletObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get reaction(): ReactionObjectDto {
    return this.data.reaction;
  }
}
