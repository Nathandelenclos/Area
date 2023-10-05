import React from 'react';
import Header from '@components/Header';
import ViewContainer from '@components/ViewContainer';
import { Text } from 'react-native';

export default function Settings(): React.JSX.Element {
  return (
    <ViewContainer>
      <Header title={'Settings'} />
      <Text>Settings</Text>
    </ViewContainer>
  );
}
