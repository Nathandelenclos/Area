import React, { JSX } from 'react';
import { SafeAreaView, Text } from 'react-native';
import ViewContainer from '@components/ViewContainer';
import Header from '@components/Header';
import AppContext from '@contexts/app.context';

export default function Home(): JSX.Element {
  const { color } = AppContext();
  return (
    <ViewContainer>
      <Header title={'Home'} />
      <Text style={{ color: color.text }}>Home</Text>
    </ViewContainer>
  );
}
