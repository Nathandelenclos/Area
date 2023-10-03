import React, { JSX } from 'react';
import LoginRegisterNavigator from './auth.navigator';
import GetMe from '@contexts/user.context';
import AppNavigator from './app.navigator';

export default function DefineNavigator(): JSX.Element {
  const { user } = GetMe();

  if (user) {
    return <AppNavigator />;
  }

  return <LoginRegisterNavigator />;
}
