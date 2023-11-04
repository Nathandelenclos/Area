import { ConfigObjectDto } from "@src/objects/ConfigObject";
import { RequireConfigObjectDto } from "@src/objects/RequireConfigObjectDto";

/**
 * ActionObjectDto
 * @description ActionObjectDto is the object that is returned from the API
 */
export interface ActionObjectDto {
  /**
   * Action id
   */
  id: number;
  /**
   * Action name
   */
  name: string;
  /**
   * Action key
   */
  key: string;
  /**
   * Action description
   */
  description: string;
  /**
   * Action is available
   */
  is_available: boolean;
  /**
   * Action config
   */
  config: RequireConfigObjectDto[];
}

/**
 * ActionAppletObjectDto
 * @description ActionAppletObjectDto is the object that is returned from the API
 */
export interface ActionAppletObjectDto {
  /**
   * Action id
   */
  id: number;
  /**
   * Action name
   */
  action: ActionObjectDto;
  /**
   * Action configs
   */
  configs?: ConfigObjectDto[];
}

/**
 * ActionObject
 * @description ActionObject is the object that is used in the app
 */
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
