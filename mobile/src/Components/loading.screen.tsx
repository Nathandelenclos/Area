import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppContext from '@contexts/app.context';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

/**
 * LoadingScreen is a reusable component for every LoadingScreen in the app.
 * It could take a style as props.
 *
 * @component
 * @example
 * // Example usage of LoadingScreen component
 * <LoadingScreen
 *   style={backgroudColor:'red'}
 * />
 *
 * @param {StyleProp<ViewStyle>} props.style - style to applicate to the LoadingScreen component .
 * @returns {JSX.Element} - Returns the rendered LoadingScreen component.
 */
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
      <ActivityIndicator size="large" color={color.mainColor} testID="activity-indicator" />
    </View>
  );
}
