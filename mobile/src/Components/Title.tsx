import {Text, TextStyle} from "react-native";
import React, {JSX} from "react";
import AppContext from "../Contexts/app.context";

export function Title({title, style}: {
    title: string,
    style?: TextStyle;
}): JSX.Element {
    const {color} = AppContext();

    return (
        <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            color: color.title,
            ...style
        }}>{title}</Text>
    )
}

export function SubTitle({title, style}: {
    title: string,
    style?: TextStyle;
}): JSX.Element {
    const {color} = AppContext();

    return (
        <Text style={{
            fontSize: 14,
            textAlign: 'center',
            color: color.subtitle,
            marginVertical: 10,
            ...style
        }}>{title}</Text>
    )
}
