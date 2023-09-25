import React, {JSX} from "react";
import {
    KeyboardTypeOptions
} from "react-native/Libraries/Components/TextInput/TextInput";
import {TextInput} from "react-native";

export default function AuthTextInput({placeholder, secure, text, setText}: { placeholder: string, secure?: boolean, text?: string, setText?: React.Dispatch<React.SetStateAction<string>> }): JSX.Element {
    const textInputType: KeyboardTypeOptions = placeholder === 'Email' ? 'email-address' : 'default';

    return (
        <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={placeholder}
            keyboardType={textInputType}
            style={{
                backgroundColor: '#f1f1f1',
                marginVertical: 5,
                borderRadius: 10,
                paddingVertical: 20,
                paddingHorizontal: 10,
            }}
            secureTextEntry={secure}
            value={text}
            onChangeText={(e) => setText ? setText(e) : null}
        />
    );
}
