import { ActionObjectDto } from "@src/objects/ActionAppletObject";
import { ReactionObjectDto } from "@src/objects/ReactionAppletObject";

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
  actions: ActionObjectDto[];
  reactions: ReactionObjectDto[];
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

  get actions() {
    return this.applet.actions;
  }

  get reactions() {
    return this.applet.reactions;
  }
}
