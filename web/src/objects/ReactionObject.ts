import { ConfigObjectDto } from "@src/objects/ConfigObject";
import { RequireConfigObjectDto } from "@src/objects/RequireConfigObjectDto";

export interface ReactionObjectDto {
  id: number;
  key: string;
  name: string;
  description: string;
  is_available: boolean;
  config: RequireConfigObjectDto[];
  reaction?: ReactionObjectDto;
  configs?: ConfigObjectDto[];
  cmd: string;
}

export interface ReactionAppletObjectDto {
  id: number;
  reaction: ReactionObjectDto;
}

export class ReactionObject {
  data: ReactionAppletObjectDto;

  constructor(object: ReactionAppletObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get name(): string {
    return this.data.reaction.name;
  }

  get reaction(): ReactionObjectDto {
    return this.data.reaction;
  }

  get config(): RequireConfigObjectDto[] {
    return this.data.reaction.config;
  }
}
