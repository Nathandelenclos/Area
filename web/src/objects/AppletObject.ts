interface AppletObjectDto {
  name: string;
  description: string;
  is_active: boolean;
  action: number;
  reaction: number;
  config: any;
}

class AppletObject {
  applet: AppletObjectDto;

  constructor(object: AppletObjectDto) {
    this.applet = object;
  }
}
