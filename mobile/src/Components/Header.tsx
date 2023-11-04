import React from 'react';
import AppContext from '@contexts/app.context';
import { View } from 'react-native';
import { Title } from '@components/Title';

export default function Header({
  title,
}: {
  title: string;
}): React.JSX.Element {
  const { color } = AppContext();

  return (
    <View style={{ backgroundColor: color.mode, marginBottom: 20 }}>
      <Title
        title={title}
        style={{
          alignSelf: 'flex-start',
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          height: 1,
          borderTopWidth: 1,
          borderColor: color.inactive,
        }}
      />
    </View>
  );
}
