import { SafeAreaView, View } from 'react-native';
import React from 'react';
import AppContext from '@contexts/app.context';

export default function ViewContainer({
  children,
}: {
  children: React.JSX.Element[] | React.JSX.Element;
}): React.JSX.Element {
  const { color } = AppContext();

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <SafeAreaView style={{ backgroundColor: color.mode, flex: 0 }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
        {children}
      </SafeAreaView>
    </View>
  );
}
