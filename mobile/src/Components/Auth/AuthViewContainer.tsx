import React, { JSX } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import AppContext from '@contexts/app.context';

/**
 * AuthViewContainer is a reusable component for every AuthViewContainer in the app.
 * It takes children and could take a bgColor as props.
 *
 * @component
 * @example
 * // Example usage of AuthViewContainer component
 * <AuthViewContainer
 *   bgColor={'red'}
 *   children={<Text>Example</Text>}
 * />
 *
 * @param {JSX.Element[]} props.children - Children to be rendered inside the AuthViewContainer component.
 * @param {string} props.bgColor - Background color of the AuthViewContainer component.
 * @returns {JSX.Element} - Returns the rendered AuthViewContainer component.
 */
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
          width: '100%',
        }}
      />
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        {children}
      </SafeAreaView>
    </View>
  );
}
