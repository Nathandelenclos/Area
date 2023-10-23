import React, { createContext, useEffect } from 'react';
import { User, UserContextType } from '@interfaces/user.interface';
import { Storage } from '@src/Storage/user.storage';
import AuthService from '@services/auth.service';
import { View } from 'react-native';
import AppContext from '@contexts/app.context';

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
  const [loading, setLoading] = React.useState<boolean>(true);
  const { color } = AppContext();

  const value: UserContextType = {
    user: user,
    setUser: setUser,
  };

  const getUser = async () => {
    const token = await Storage.getToken();
    if (token) {
      const resp = await AuthService.getProfile(token);
      setUser({ ...resp.data, access_token: token });
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: color.mode }} />;
  }

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

const UserCtx = () => React.useContext(UserContext);
export default UserCtx;
