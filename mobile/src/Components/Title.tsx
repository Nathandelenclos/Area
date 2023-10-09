import { Text, TextStyle } from 'react-native';
import React, { JSX } from 'react';
import AppContext from '@contexts/app.context';

type ImportantTextProps = {
  title: string;
  style?: TextStyle;
};

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
