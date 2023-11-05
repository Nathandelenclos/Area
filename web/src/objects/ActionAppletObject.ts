import { ConfigObjectDto } from "@src/objects/ConfigObject";
import { RequireConfigObjectDto } from "@src/objects/RequireConfigObjectDto";

export interface ActionObjectDto {
  id: number;
  name: string;
  key: string;
  description: string;
  is_available: boolean;
  config: RequireConfigObjectDto[];
  action?: ActionObjectDto;
  configs?: ConfigObjectDto[];
}

export interface ActionAppletObjectDto {
  id: number;
  action: ActionObjectDto;
}

export class ActionObject {
  data: ActionObjectDto;

  constructor(object: ActionObjectDto) {
    this.data = object;
  }

  get id(): number {
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

  get action(): ActionObjectDto | undefined {
    return this.data.action;
  }

  get configs(): ConfigObjectDto[] | undefined {
    return this.data.configs;
  }

  set configs(configs: ConfigObjectDto[] | undefined) {
    this.data.configs = configs;
  }
}

export class ActionAppletObject {
  data: ActionAppletObjectDto;

  constructor(object: ActionAppletObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get name(): string {
    return this.data.action.name;
  }

  get action(): ActionObjectDto {
    return this.data.action;
  }

  get config(): RequireConfigObjectDto[] {
    return this.data.action.config;
  }
}
