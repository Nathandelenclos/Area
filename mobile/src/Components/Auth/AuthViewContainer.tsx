import React, { JSX } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function AuthViewContainer({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  const { color } = AppContext();

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
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
          width: '100%',
        }}
      />
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        {children}
      </SafeAreaView>
    </View>
  );
}
