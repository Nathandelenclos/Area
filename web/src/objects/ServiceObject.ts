import { ActionObject } from "@src/objects/ActionObject";
import { ReactionObjectDto } from "@src/objects/ReactionObject";

export interface ServiceObjectDto {
  id: number;
  name: string;
  url: string;
  is_available: boolean;
  actions: ActionObject[];
  reactions: ReactionObjectDto[];
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

  get actions(): ActionObject[] {
    return this.data.actions;
  }

  get reactions(): ReactionObjectDto[] {
    return this.data.reactions;
  }
}
