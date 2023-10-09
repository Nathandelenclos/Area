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
  action: any;
  reaction: any;
}

export class AppletObject {
  applet: AppletObjectDto;

  constructor(object: AppletObjectDto) {
    this.applet = object;
  }

  get id() {
    return this.applet.id;
  }
}
