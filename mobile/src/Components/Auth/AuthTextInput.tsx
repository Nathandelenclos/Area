import React, { JSX } from 'react';
import { KeyboardTypeOptions } from 'react-native/Libraries/Components/TextInput/TextInput';
import { TextInput } from 'react-native';
import AppContext from '@contexts/app.context';

/**
 * Props for the AuthTextInput component.
 * @interface AuthTextInputProps
 */
type AuthTextInputProps = {
  /**
   * placeholder of the service.
   */
  placeholder: string;
  /**
   * secure of the service secureTextEntry.
   */
  secure?: boolean;
  /**
   * text of the service.
   */
  text?: string;
  /**
   * setText of the service.
   */
  setText?: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * AuthTextInput is a reusable component for every AuthTextInput in the app.
 * It takes a placeholder and could take a secure, text and setText function as props.
 *
 * @component
 * @example
 * // Example usage of AuthTextInput component
 * <AuthTextInput
 *   bgColor={'red'}
 *   children={<Text>Example</Text>}
 * />
 *
 * @param {JSX.Element[]} props.children - Children to be rendered inside the AuthTextInput component.
 * @param {string} props.bgColor - Background color of the AuthTextInput component.
 * @returns {JSX.Element} - Returns the rendered AuthTextInput component.
 */
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
