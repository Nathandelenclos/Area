import { ActionAppletObjectDto } from "@src/objects/ActionAppletObject";
import { ReactionAppletObjectDto } from "@src/objects/ReactionAppletObject";

export interface NewEventConfig {
  config: {
    [key: string]: string;
  };
  id: number;
}

export interface NewAppletRequest {
  name: string;
  description: string;
  is_active: boolean;
  reactions: NewEventConfig[];
  actions: NewEventConfig[];
}

export interface AppletObjectDto {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  actions: ActionAppletObjectDto[];
  reactions: ReactionAppletObjectDto[];
}

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
