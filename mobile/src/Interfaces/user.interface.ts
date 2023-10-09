import React from 'react';

export interface User {
  name: string;
  email: string;
  access_token: string;
  id: string;
}

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
