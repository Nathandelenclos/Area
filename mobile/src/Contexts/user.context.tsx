import React, { createContext } from 'react';
import { User, UserContextType } from '@interfaces/user.interface';

export const UserContext = createContext<UserContextType>({
  user: {
    name: '',
    email: '',
  },
  setUser: () => {},
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

const GetMe = () => React.useContext(UserContext);
export default GetMe;
