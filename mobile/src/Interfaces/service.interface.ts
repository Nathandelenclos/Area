import { IReaction } from '@interfaces/reaction.interface';
import { IAction } from '@interfaces/action.interface';

export interface IService {
  id: number;
  name: string;
  url: string;
  is_available: boolean;
  actions?: IAction[];
  reactions?: IReaction[];
}
