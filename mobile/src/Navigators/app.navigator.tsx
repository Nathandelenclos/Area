import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import Home from "../Views/Home";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function AppNavigator(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
                initialRouteName={'Home'}>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
