import { ActionAppletObject } from "@src/objects/ActionAppletObject";
import {
  ReactionAppletObject,
  ReactionObjectDto,
} from "@src/objects/ReactionAppletObject";

export interface ServiceObjectDto {
  id: number;
  name: string;
  url: string;
  is_available: boolean;
  actions: ActionAppletObject[];
  reactions: ReactionAppletObject[];
}

export class ServiceObject {
  data: ServiceObjectDto;

  constructor(object: ServiceObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get actions(): ActionAppletObject[] {
    return this.data.actions;
  }

  get reactions(): ReactionAppletObject[] {
    return this.data.reactions;
  }
}
