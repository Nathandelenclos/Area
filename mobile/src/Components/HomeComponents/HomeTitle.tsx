import React from 'react';
import { View, Text } from 'react-native';

export type HomeTitleProps = {
  text: string;
  textColor: string;
};

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
