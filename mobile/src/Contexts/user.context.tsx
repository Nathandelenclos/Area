import React, { createContext, useEffect } from 'react';
import { User, UserContextType } from '@interfaces/user.interface';
import { Storage } from '@src/Storage/user.storage';
import AuthService from '@services/auth.service';
import { View } from 'react-native';
import AppContext from '@contexts/app.context';
import LoadingScreen from '@components/loading.screen';

export const UserContext = createContext<UserContextType>({
  user: {
    id: '',
    name: '',
    email: '',
    token: '',
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
      if (!resp.data) {
        await Storage.removeToken();
        setUser(null);
      } else setUser({ ...resp.data, token: token });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      Storage.removeToken();
    }
  }, [user]);

  useEffect(() => {
    getUser();
    // setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

const UserCtx = () => React.useContext(UserContext);
export default UserCtx;
