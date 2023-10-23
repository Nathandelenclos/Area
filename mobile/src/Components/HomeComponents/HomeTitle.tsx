import React from 'react';
import { View, Text } from 'react-native';

export type HomeTitleProps = {
  text: string;
  textColor: string;
};

export default function HomeTitle({ text, textColor }: HomeTitleProps) {
  const parts = text.split(' ');

  return (
    <View>
      <Text
        style={{
          color: textColor,
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        {parts[0]}
      </Text>
      <Text
        style={{
          color: textColor,
          fontSize: 32,
          marginBottom: '6%',
          fontWeight: 'bold',
        }}
      >
        {parts[1] + ' ' + parts[2]}
      </Text>
    </View>
  );
}
