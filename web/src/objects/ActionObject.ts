import { ConfigObjectDto } from "@src/objects/ConfigObject";
import { RequireConfigObjectDto } from "@src/objects/RequireConfigObjectDto";

export interface ActionObjectDto {
  id: number;
  name: string;
  key: string;
  description: string;
  is_available: boolean;
  config: RequireConfigObjectDto[];
}

export interface ActionAppletObjectDto {
  id: number;
  action: ActionObjectDto;
  configs?: ConfigObjectDto[];
}

export class ActionObject {
  data: ActionAppletObjectDto;

  constructor(object: ActionAppletObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get action(): ActionObjectDto {
    return this.data.action;
  }

  get configs(): ConfigObjectDto[] | undefined {
    return this.data.configs;
  }
}
