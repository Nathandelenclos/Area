import React from 'react';

type Oauth = {
  id: string;
  email: string;
  provider: string;
};

export interface User {
  name: string;
  email: string;
  token: string;
  id: string;
  oauth: Oauth[];
}

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  reloadUser: () => Promise<void>;
};
