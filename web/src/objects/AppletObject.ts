export interface AppletObjectDto {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  action: any;
  reaction: any;
}

export default class AppletObject {
  applet: AppletObjectDto;

  constructor(object: AppletObjectDto) {
    this.applet = object;
  }

  get id() {
    return this.applet.id;
  }
}
