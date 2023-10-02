import React, {JSX} from "react";
import {Text, TouchableOpacity} from "react-native";
import AppContext from "../Contexts/app.context";

export default function MyButton({inverse = false, title, onPress}: {
    inverse?: boolean,
    title: string
    onPress?: () => void
}): JSX.Element {
    const {color} = AppContext();

    return (
        <TouchableOpacity style={{
            backgroundColor: inverse ? color.mode : color.mainColor,
            borderColor: color.mainColor,
            borderWidth: 2,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginVertical: 10,
            marginHorizontal: 20,
        }}
        onPress={onPress}>
            <Text style={{
                fontSize: 15,
                textAlign: 'center',
                color: inverse ? color.mainColor : color.textOverMainColor,
                fontWeight: 'bold',
            }}>{title}</Text>
        </TouchableOpacity>
    )
}
