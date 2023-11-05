import { ActionAppletObjectDto } from "@src/objects/ActionAppletObject";
import { ReactionAppletObjectDto } from "@src/objects/ReactionAppletObject";

export interface NewEventConfig {
  config: {
    /**
     * Action key
     */
    [key: string]: string;
  };
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
  actions: ActionAppletObjectDto[];
  /**
   * Applet reactions
   */
  reactions: ReactionAppletObjectDto[];
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

  get description() {
    return this.applet.description;
  }

  get is_active() {
    return this.applet.is_active;
  }

  set is_active(is_active: boolean) {
    this.applet.is_active = is_active;
  }

  get actions() {
    return this.applet.actions;
  }

  get reactions() {
    return this.applet.reactions;
  }

  toNewAppletRequest(): NewAppletRequest {
    return {
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      actions: this.actions.map((action) => {
        if (!action.configs)
          return {
            id: action.action.id,
            config: {},
          } as NewEventConfig;
        return {
          id: action.action.id,
          config: action.configs?.reduce((acc, config) => {
            return {
              ...acc,
              [config.key]: config.value,
            };
          }, {}),
        } as NewEventConfig;
      }),
      reactions: this.reactions.map((reaction) => {
        if (!reaction.configs)
          return {
            id: reaction.reaction.id,
            config: {},
          } as NewEventConfig;
        return {
          id: reaction.reaction.id,
          config: reaction.configs?.reduce((acc, config) => {
            return {
              ...acc,
              [config.key]: config.value,
            };
          }, {}),
        } as NewEventConfig;
      }),
    };
  }
}
