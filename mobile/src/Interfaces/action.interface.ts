export interface IAction {
  id: number;
  action: IActionConfig;
  configs: Iconfig[];
  actionId: number;
}

interface Iconfig {
  id: number;
  key: string;
  value: string;
}

interface IActionConfig {
  id: number;
  key: string;
  name: string;
  description: string;
  is_available: boolean;
  config: Iconf[];
}

type Iconf = {
  id: number;
  key: string;
  name: string;
  description: string;
  type: string;
};

export const DEFAULT_ACTION: IAction = {
  id: 0,
  action: {
    id: 0,
    key: '',
    name: '...',
    description: '',
    is_available: false,
    config: [],
  },
  configs: [],
};
