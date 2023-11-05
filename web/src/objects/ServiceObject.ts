import { ActionAppletObject } from "@src/objects/ActionAppletObject";
import {
  ReactionAppletObject,
  ReactionObjectDto,
} from "@src/objects/ReactionAppletObject";

/**
 * ServiceObjectDto
 * @description ServiceObjectDto is the object that is returned from the API
 */
export interface ServiceObjectDto {
  /**
   * Service id
   */
  id: number;
  /**
   * Service name
   */
  name: string;
  /**
   * Service url
   */
  url: string;
  /**
   * Is service available
   */
  is_available: boolean;
  /**
   * Service actions
   */
  actions: ActionAppletObject[];
  /**
   * Service reactions
   */
  reactions: ReactionAppletObject[];
}

/**
 * ServiceObject
 * @description ServiceObject is the object that is used in the app
 */
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
