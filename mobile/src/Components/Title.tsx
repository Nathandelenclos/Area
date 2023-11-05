import { Text, TextStyle } from 'react-native';
import React, { JSX } from 'react';
import AppContext from '@contexts/app.context';

/**
 * Props for the Title component.
 * @interface ImportantTextProps
 */
type ImportantTextProps = {
  /**
   * Title of the service.
   */
  title: string;
  /**
   * style of the service text.
   */
  style?: TextStyle;
};

/**
 * Title is a reusable component for every title in the app.
 * It takes a title and could have a style as props.
 *
 * @component
 * @example
 * // Example usage of Title component
 * <Title
 *   title={'title'}
 *   style={{color:'red}}
 * />
 *
 * @param {ImportantTextProps} props - The props for the Title component.
 * @returns {JSX.Element} - Returns the rendered Title component.
 */
export function Title({ title, style }: ImportantTextProps): JSX.Element {
  const { color } = AppContext();

  return (
    <Text
      style={{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: color.title,
        ...style,
      }}
    >
      {title}
    </Text>
  );
}
