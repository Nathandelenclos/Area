import { ActionObject, ActionObjectDto } from "@src/objects/ActionObject";
import { ReactionObject, ReactionObjectDto } from "@src/objects/ReactionObject";

export interface NewAppletDto {
  name: string;
  description: string;
  is_active: boolean;
  action: number;
  reaction: number;
  config: any;
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
  action: ActionObjectDto;
  reaction: ReactionObjectDto;
}

export class AppletObject {
  applet: AppletObjectDto;
  applet_action: ActionObject;
  applet_reaction: ReactionObject;

  constructor(object: AppletObjectDto) {
    this.applet = object;
    console.log(object);
    this.applet_action = new ActionObject(object.action);
    this.applet_reaction = new ReactionObject(object.reaction);
  }

  get id() {
    return this.applet.id;
  }

  get name() {
    return this.applet.name;
  }

  get action() {
    return this.applet_action;
  }

  get reaction() {
    return this.applet_reaction;
  }
}
