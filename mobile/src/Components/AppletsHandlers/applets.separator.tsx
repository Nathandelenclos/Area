import React, { JSX } from 'react';
import { View } from 'react-native';

/**
 * DrawSeparator is a reusable component for every DrawSeparator in the app.
 * It can take a extendHeigth as props.
 *
 * @component
 * @example
 * // Example usage of DrawSeparator component
 * <DrawSeparator
 *  extendHeigth={10}
 * />
 *
 * @param {number} props.extendHeigth - The props for the DrawSeparator component.
 * @returns {JSX.Element} - Returns the rendered DrawSeparator component.
 */
export default function DrawSeparator({
  extendHeigth = 0,
}: {
  extendHeigth?: number;
}): JSX.Element {
  return (
    <View
      style={{
        backgroundColor: '#bbbbbb',
        width: 20,
        height: 40 + extendHeigth,
        alignSelf: 'center',
      }}
      testID={'draw-separator'}
    />
  );
}
