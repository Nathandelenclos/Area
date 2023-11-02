import { ReactionObjectDto } from "@src/objects/ReactionObject";

type actionConfig = {
  id: number;
  description: string;
  key: string;
  name: string;
  type: string;
};

export interface ActionObjectDto {
  id: number;
  name: string;
  description: string;
  is_available: boolean;
  config: actionConfig[];
  configs?: { key: string; value: string }[];
  action?: ActionObjectDto;
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

  get description(): string {
    return this.data.description;
  }

  get config(): actionConfig[] {
    return this.data.config || [];
  }

  get reaction(): ReactionObjectDto | undefined {
    return this.data.action;
  }

  get configs(): { key: string; value: string }[] {
    return this.data.configs || [];
  }
}
