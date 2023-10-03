import { Text, TextStyle } from 'react-native';
import React, { JSX } from 'react';
import AppContext from '@contexts/app.context';

type ImportantTextProps = {
  title: string;
  style?: TextStyle;
};

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
