import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export default function LoadingScreen({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const { color } = AppContext();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'center',
        ...(style || {}),
      }}
    >
      <ActivityIndicator size="large" color={color.mainColor} />
    </View>
  );
}
