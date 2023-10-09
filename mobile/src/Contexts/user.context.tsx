import React, { createContext } from 'react';
import { User, UserContextType } from '@interfaces/user.interface';

export const UserContext = createContext<UserContextType>({
  user: {
    id: '',
    name: '',
    email: '',
    access_token: '',
  },
  setUser: () => {
    return;
  },
});

export const UserProvider = (props: { children: any }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const value: UserContextType = {
    user: user,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

const UserCtx = () => React.useContext(UserContext);
export default UserCtx;
