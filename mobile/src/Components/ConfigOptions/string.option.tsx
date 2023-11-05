import { TextInput } from 'react-native';
import React from 'react';

/**
 * StringInput is a reusable component for every StringInput in the app.
 * It takes a name, value and a setValue function as props.
 *
 * @component
 * @example
 * // Example usage of StringInput component
 * <StringInput
 *   name={'StringInput'}
 *   value={'Test'}
 *   setValue={(value: Date) => setValue(key, value)}
 * />
 *
 * @param {string} props.name - The name of the StringInput.
 * @param {string} props.value - The value of the StringInput.
 * @param {() => void} props.setValue - The setValue function of the StringInput.
 * @returns {JSX.Element} - Returns the rendered StringInput component.
 */
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
