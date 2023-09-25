import React, {JSX} from "react";
import {SafeAreaView, View} from "react-native";

export default function AuthViewContainer({children}: {
    children: JSX.Element[]
}): JSX.Element {
    return (
        <View
            style={{flex: 1, backgroundColor: '#dfe1e5'}}>
            <View style={{
                backgroundColor: '#7a73e7',
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '45%',
            }}/>
            <SafeAreaView style={{flex: 1, position: 'relative'}}>
                {children}
            </SafeAreaView>
        </View>
    );
}
