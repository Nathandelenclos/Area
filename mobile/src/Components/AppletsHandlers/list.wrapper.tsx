import React from 'react';
import { SafeAreaView } from 'react-native';
import AppContext from '@contexts/app.context';
import Header from '@components/Header';

/**
 * ListWrapper is a reusable component for every ListWrapper in the app.
 * It takes a navigation, children and title_key as props.
 *
 * @component
 * @example
 * // Example usage of ListWrapper component
 * <ListWrapper
 *   navigation={navigation}
 *   children={<Text>Test</Text>}
 *   title_key={'title'}
 * />
 *
 * @param {ImportantTextProps} props - The props for the ListWrapper component.
 * @returns {JSX.Element} - Returns the rendered ListWrapper component.
 */
export default function ListWrapper({
  navigation,
  children,
  title_key,
}: {
  navigation: any;
  children: React.ReactNode;
  title_key: string;
}) {
  const { color, translate } = AppContext();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.mode,
      }}
    >
      <Header
        title={translate(title_key)}
        leftIcon={'angle-left'}
        onPressLeft={() => navigation.pop()}
      />
      {children}
    </SafeAreaView>
  );
}
