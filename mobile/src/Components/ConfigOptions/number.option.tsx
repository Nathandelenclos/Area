import { TextInput } from 'react-native';
import React from 'react';

/**
 * NumberInput is a reusable component for every NumberInput in the app.
 * It takes a name, value and a setValue function as props.
 *
 * @component
 * @example
 * // Example usage of NumberInput component
 * <NumberInput
 *   name={'NumberInput'}
 *   value={1}
 *   setValue={(value: Date) => setValue(key, value)}
 * />
 *
 * @param {string} props.name - The name of the NumberInput.
 * @param {number} props.value - The value of the NumberInput.
 * @param {() => void} props.setValue - The setValue function of the NumberInput.
 * @returns {JSX.Element} - Returns the rendered NumberInput component.
 */
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
