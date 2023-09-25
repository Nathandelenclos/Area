import React, {JSX} from "react";
import {Text, TouchableOpacity} from "react-native";

export default function MyButton({inverse = false, title, onPress}: {
    inverse?: boolean,
    title: string
    onPress?: () => void
}): JSX.Element {
    return (
        <TouchableOpacity style={{
            backgroundColor: inverse ? 'white' : '#7a73e7',
            borderColor: '#7a73e7',
            borderWidth: 2,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginVertical: 10,
        }}
        onPress={onPress}>
            <Text style={{
                fontSize: 15,
                textAlign: 'center',
                color: inverse ? '#7a73e7' : 'white',
                fontWeight: 'bold',
            }}>{title}</Text>
        </TouchableOpacity>
    )
}
