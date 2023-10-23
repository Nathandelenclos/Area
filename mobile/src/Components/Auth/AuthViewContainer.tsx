import React, { JSX } from 'react';
import { SafeAreaView, View } from 'react-native';
import AppContext from '@contexts/app.context';

export default function AuthViewContainer({
  children,
  bgColor,
}: {
  children: JSX.Element[];
  bgColor?: string;
}): JSX.Element {
  const { color } = AppContext();

  return (
    <View style={{ flex: 1, backgroundColor: bgColor?bgColor:color.background }}>
      <View
        style={{
          backgroundColor: color.mainColor,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '45%',
        }}
      />
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        {children}
      </SafeAreaView>
    </View>
  );
}
