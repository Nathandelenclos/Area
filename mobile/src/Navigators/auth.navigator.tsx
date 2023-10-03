import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@views/AuthView/LoginScreen';
import SignIn from '@views/AuthView/SignIn';
import SignUp from '@views/AuthView/SignUp';
import RecoverPassword from '@views/AuthView/RecoverPassword';

const Stack = createNativeStackNavigator();

export default function AuthentificationNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={'Login'}
      >
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'SignIn'} component={SignIn} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'RecoverPassword'} component={RecoverPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
