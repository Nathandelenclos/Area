import React, { JSX } from 'react';
import { KeyboardTypeOptions } from 'react-native/Libraries/Components/TextInput/TextInput';
import { TextInput } from 'react-native';
import AppContext from '@contexts/app.context';

type AuthTextInputProps = {
  placeholder: string;
  secure?: boolean;
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
};

export default function AuthTextInput({
  placeholder,
  secure,
  text,
  setText,
}: AuthTextInputProps): JSX.Element {
  const { color } = AppContext();
  const textInputType: KeyboardTypeOptions =
    placeholder === 'Email' ? 'email-address' : 'default';

  return (
    <TextInput
      autoCapitalize={'none'}
      autoCorrect={false}
      placeholder={placeholder}
      keyboardType={textInputType}
      placeholderTextColor={'gray'}
      style={{
        backgroundColor: color.textInput,
        marginVertical: 5,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        color: color.title,
      }}
      secureTextEntry={secure}
      value={text}
      onChangeText={(e) => (setText ? setText(e) : null)}
    />
  );
}
