import { ActionObjectDto } from "@src/objects/ActionObject";
import { ReactionObjectDto } from "@src/objects/ReactionObject";

/**
 * NewEventConfig
 * @interface NewEventConfig
 */
interface NewEventConfig {
  /**
   * Action key
   */
  [key: string]: any;
  /**
   * Action id
   */
  id: number;
}

/**
 * NewAppletRequest
 * @interface NewAppletRequest
 */
export interface NewAppletRequest {
  /**
   * Applet name
   */
  name: string;
  /**
   * Applet description
   */
  description: string;
  /**
   * Applet is active
   */
  is_active: boolean;
  /**
   * Applet reactions
   */
  reactions: NewEventConfig[];
  /**
   * Applet actions
   */
  actions: NewEventConfig[];
}

/**
 * AppletObjectDto
 * @description AppletObjectDto is the object that is returned from the API
 */
export interface AppletObjectDto {
  /**
   * Applet id
   */
  id: number;
  /**
   * Applet name
   */
  name: string;
  /**
   * Applet description
   */
  description: string;
  /**
   * Applet is active
   */
  is_active: boolean;
  /**
   * Applet actions
   */
  actions: ActionObjectDto[];
  /**
   * Applet reactions
   */
  reactions: ReactionObjectDto[];
}

/**
 * AppletObject
 * @description AppletObject is the object that is used in the app
 */
export class AppletObject {
  applet: AppletObjectDto;

  constructor(object: AppletObjectDto) {
    this.applet = object;
  }

  get id() {
    return this.applet.id;
  }

  get name() {
    return this.applet.name;
  }

  get actions() {
    return this.applet.actions;
  }

  get reactions() {
    return this.applet.reactions;
  }
}
