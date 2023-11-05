import { SafeAreaView, View } from 'react-native';
import React from 'react';
import AppContext from '@contexts/app.context';

/**
 * ViewContainer is a reusable component for every ViewContainer in the app.
 * It takes a child or children and could take a background as props.
 *
 * @component
 * @example
 * // Example usage of ViewContainer component
 * <ViewContainer background={'red'} >
 *  <Text>Example</Text>
 * </ViewContainer>
 *
 * @param {React.JSX.Element[] | React.JSX.Element} props.children - Children to be rendered inside the ViewContainer component.
 * @param {string} props.background - Background color of the ViewContainer component.
 * @returns {JSX.Element} - Returns the rendered ViewContainer component.
 */
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
