import {Text, TextStyle} from "react-native";
import React, {JSX} from "react";

export function Title({title, style}: {
    title: string,
    style?: TextStyle;
}): JSX.Element {
    return (
        <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            ...style
        }}>{title}</Text>
    )
}

export function SubTitle({title, style}: {
    title: string,
    style?: TextStyle;
}): JSX.Element {
    return (
        <Text style={{
            fontSize: 14,
            textAlign: 'center',
            color: 'gray',
            marginVertical: 10,
            ...style
        }}>{title}</Text>
    )
}
