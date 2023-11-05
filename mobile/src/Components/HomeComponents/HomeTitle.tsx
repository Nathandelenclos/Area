import React from 'react';
import { View, Text } from 'react-native';

/**
 * Props for the HomeTitle component.
 * @interface HomeTitleProps
 */
export type HomeTitleProps = {
  /**
   * Title of the Page.
   */
  text: string;
  /**
   * Title Color.
   */
  textColor: string;
};

/**
 * HomeTitle is a reusable component for every HomeTitle in the app.
 * It takes a HomeTitle and a textColor as props.
 *
 * @component
 * @example
 * // Example usage of HomeTitle component
 * <HomeTitle
 *   text={'Home Title'}
 *   textColor={'red'}
 * />
 *
 * @param {HomeTitleProps} props - The props for the HomeTitle component.
 * @returns {JSX.Element} - Returns the rendered HomeTitle component.
 */
export default function HomeTitle({ text, textColor }: HomeTitleProps) {
  const firstPart = text.split(' ')[0];
  const parts = text.slice(firstPart.length).split(' ').join(' ');

  return (
    <View>
      <Text
        style={{
          color: textColor,
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        {firstPart}
      </Text>
      <Text
        style={{
          color: textColor,
          fontSize: 32,
          marginBottom: '6%',
          fontWeight: 'bold',
        }}
      >
        {parts}
      </Text>
    </View>
  );
}
