import { IReaction } from '@interfaces/reaction.interface';
import { IAction } from '@interfaces/action.interface';

export interface IApplet {
  name: string;
  is_active: boolean;
  reaction: IReaction;
  action: IAction;
  config: any;
}
