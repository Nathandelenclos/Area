import React, { JSX } from 'react';
import { View } from 'react-native';

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
    />
  );
}
