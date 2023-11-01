import { TextInput } from 'react-native';
import React from 'react';

export default function NumberInput({
  name,
  value,
  setValue,
}: {
  name: string;
  value: number;
  setValue: (value: number) => void;
}) {
  function checkValue(tmp: string) {
    if (tmp.length > 21) {
      return;
    }
    const val = Number(tmp);
    if (isNaN(val)) {
      return;
    }
    if (val < 0) {
      return;
    }
    setValue(val);
  }

  return (
    <TextInput
      value={value.toString()}
      onChangeText={checkValue}
      keyboardType={'numeric'}
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
