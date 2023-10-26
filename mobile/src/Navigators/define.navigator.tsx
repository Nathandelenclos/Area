import React, { JSX } from 'react';
import LoginRegisterNavigator from './auth.navigator';
import UserCtx from '@contexts/user.context';
import AppNavigator from './app.navigator';
import ChangeURL from '@views/ChangeURL';

export default function DefineNavigator(): JSX.Element {
  const { user } = UserCtx();

  if (user) {
    return <AppNavigator />;
  }

  return <LoginRegisterNavigator />;
}
