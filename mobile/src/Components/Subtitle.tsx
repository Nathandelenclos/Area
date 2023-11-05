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
 * SubTitle is a reusable component for every subtitle in the app.
 * It takes a title and could have a style as props.
 *
 * @component
 * @example
 * // Example usage of SubTitle component
 * <SubTitle
 *   title={'title'}
 *   style={{color:'red}}
 * />
 *
 * @param {ImportantTextProps} props - The props for the SubTitle component.
 * @returns {JSX.Element} - Returns the rendered SubTitle component.
 */
export function SubTitle({ title, style }: ImportantTextProps): JSX.Element {
  const { color } = AppContext();

  return (
    <Text
      style={{
        fontSize: 14,
        textAlign: 'center',
        color: color.subtitle,
        marginVertical: 10,
        ...style,
      }}
    >
      {title}
    </Text>
  );
}
