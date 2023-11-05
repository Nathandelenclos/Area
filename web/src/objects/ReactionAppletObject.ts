import { ConfigObjectDto } from "@src/objects/ConfigObject";
import { RequireConfigObjectDto } from "@src/objects/RequireConfigObjectDto";

export interface ReactionObjectDto {
  id?: number;
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
  data: ReactionObjectDto;

  constructor(object: ReactionObjectDto) {
    this.data = object;
  }

  get id(): number | undefined {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get key(): string {
    return this.data.key;
  }

  get description(): string {
    return this.data.description;
  }

  get isAvailable(): boolean {
    return this.data.is_available;
  }

  get config(): RequireConfigObjectDto[] {
    return this.data.config;
  }

  get reaction(): ReactionObjectDto | undefined {
    return this.data.reaction;
  }

  get configs(): ConfigObjectDto[] | undefined {
    return this.data.configs;
  }

  set configs(configs: ConfigObjectDto[] | undefined) {
    this.data.configs = configs;
  }
}

export class ReactionAppletObject {
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
