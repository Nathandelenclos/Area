import { TextInput } from 'react-native';
import React from 'react';

export default function StringInput({
  name,
  value,
  setValue,
}: {
  name: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <TextInput
      value={value.toString()}
      onChangeText={setValue}
      keyboardType={'default'}
      placeholder={name}
      placeholderTextColor={'#CBCBCB'}
      style={{
        backgroundColor: '#F0F0F0',
        marginVertical: 20,
        padding: 20,
        borderRadius: 5,
        fontWeight: 'bold',
      }}
    />
  );
}
