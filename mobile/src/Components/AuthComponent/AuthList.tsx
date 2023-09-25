import React, {JSX} from "react";
import {DimensionValue, Text, TouchableOpacity, View} from "react-native";

export function TextBetweenBar(): JSX.Element {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
        }}>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'gray',
            }}/>
            <Text style={{
                marginHorizontal: 10,
                fontSize: 12,
                color: 'gray',
            }}>Or connect using</Text>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'gray',
            }}/>
        </View>
    );
}

export  function AuthList(): JSX.Element {
    const authList = [
        {
            title: 'F',
            color: '#3b5998',
        },
        {
            title: 'G',
            color: '#db4437',
        },
        {
            title: 'X',
            color: '#00acee',
        },
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
                }}>
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
    return (
        <View style={{width: width}}>
            <TextBetweenBar />
            <View style={{backgroundColor: 'white', borderRadius: 20, padding: 10}}>
                <AuthList />
            </View>
        </View>
    )
}
