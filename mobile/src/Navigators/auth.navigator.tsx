import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from "../Views/LoginScreen";
import SignIn from "../Views/SignIn";
import SignUp from "../Views/SignUp";
import RecoverPassword from "../Views/RecoverPassword";

const Stack = createNativeStackNavigator();

export default function AuthentificationNavigator(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
                initialRouteName={'Login'}>
                <Stack.Screen name={'Login'} component={LoginScreen}/>
                <Stack.Screen name={'SignIn'} component={SignIn}/>
                <Stack.Screen name={'SignUp'} component={SignUp}/>
                <Stack.Screen name={'RecoverPassword'}
                              component={RecoverPassword}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
