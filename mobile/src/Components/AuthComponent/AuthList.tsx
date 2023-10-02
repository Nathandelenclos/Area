import React, {JSX} from "react";
import {DimensionValue, Text, TouchableOpacity, View} from "react-native";
import AppContext from "../../Contexts/app.context";
import {
    signInWithFacebook, signInWithGithub,
    signInWithGoogle, signInWithSpotify
} from "../../Views/AuthView/auth.fun";
export function TextBetweenBar(): JSX.Element {
    const {color, translate} = AppContext();

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
        }}>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: color.subtitle,
            }}/>
            <Text style={{
                marginHorizontal: 10,
                fontSize: 12,
                color: color.subtitle,
            }}>{translate('or_connect_with')}</Text>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: color.subtitle,
            }}/>
        </View>
    );
}

export  function AuthList(): JSX.Element {

    const authList = [
        {
            title: 'F',
            color: '#3b5998',
            onPress: () => signInWithFacebook(),
        },
        {
            title: 'G',
            color: '#db4437',
            onPress: () => signInWithGoogle(),
        },
        {
            title: 'S',
            color: '#1db954',
            onPress: () => signInWithSpotify(),
        },
        {
            title: 'G',
            color: '#24292e',
            onPress: () => signInWithGithub(),
        }
    ];

    return (
        <View style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-around',
        }}>
            {authList.map((item, index) => (
                <TouchableOpacity key={index} style={{
                    backgroundColor: item.color,
                    padding: 10,
                    borderRadius: 5,
                }} onPress={item.onPress}>
                    <Text style={{
                        fontSize: 12,
                        color: 'white',
                        textAlign: 'center',
                    }}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export function AuthFooter({width} : {width: DimensionValue}): JSX.Element {
    const {color} = AppContext();

    return (
        <View style={{width: width}}>
            <TextBetweenBar />
            <View style={{backgroundColor: color.mode, borderRadius: 20, padding: 10}}>
                <AuthList />
            </View>
        </View>
    )
}
