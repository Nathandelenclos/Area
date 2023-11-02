import { ActionObject, ActionObjectDto } from "@src/objects/ActionObject";
import { ReactionObject, ReactionObjectDto } from "@src/objects/ReactionObject";

interface NewEventConfig {
  [key: string]: any;
  id: number;
}

export interface NewAppletRequest {
  name: string;
  description: string;
  is_active: boolean;
  reactions: NewEventConfig[];
  actions: NewEventConfig[];
}

/*
*     "name": "My Applet #1",
    "description": "My applet's description",
    "is_active": true,
    "reaction": 1,
    "action": 1,
    "config": {
        "private_key": "laprivatekeyyyy",
        "config2": "configggg"
    }
* */

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
