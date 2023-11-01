export interface IReaction {
  id: number;
  reaction: IReactionConfig;
  configs: Iconfig[];
  reactionId: number;
}

type IReactionConfig = {
  id: number;
  key: string;
  name: string;
  description: string;
  is_available: boolean;
  cmd: string;
  config: Iconf[];
};

type Iconf = {
  id: number;
  key: string;
  name: string;
  description: string;
  type: string;
};

type Iconfig = {
  id: number;
  key: string;
  value: string;
};

export const DEFAULT_REACTION: IReaction = {
  id: 0,
  reaction: {
    id: 0,
    key: '',
    name: '...',
    description: '',
    is_available: false,
    cmd: '',
    config: [],
  },
  configs: [],
};

/*
{
    "id": 30,
    "reaction": {
      "id": 1,
      "key": "discord_message",
      "name": "Discord Message",
      "description": "Send a message to a channel",
      "is_available": true,
      "cmd": "send_message",
      "config": [
        {
          "id": 1,
          "name": "test config",
          "description": "description test config",
          "key": "test",
          "type": "number"
        }
      ]
    },
    "configs": [
      {
        "id": 85,
        "key": "test",
        "value": "test"
      }
    ]
  }
 */
