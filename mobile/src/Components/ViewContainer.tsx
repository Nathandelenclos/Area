import { SafeAreaView, View } from 'react-native';
import React from 'react';
import AppContext from '@contexts/app.context';

export default function ViewContainer({
  children,
  background,
}: {
  children: React.JSX.Element[] | React.JSX.Element;
  background?: string;
}): React.JSX.Element {
  const { color } = AppContext();

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <SafeAreaView
        style={{ backgroundColor: background || color.mainColor, flex: 0 }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
        {children}
      </SafeAreaView>
    </View>
  );
}
