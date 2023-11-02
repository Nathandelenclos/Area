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
