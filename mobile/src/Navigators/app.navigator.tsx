import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { JSX } from 'react';
import Home from '@views/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '@views/Settings';
import AppContext from '@contexts/app.context';
import MyAppletsView from '@views/MyApplets';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function SettingsNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={'Setting'}
    >
      <Stack.Screen name="Setting" component={Settings} />
    </Stack.Navigator>
  );
}

export default function AppNavigator(): JSX.Element {
  const { color } = AppContext();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.mode,
          },
          tabBarActiveTintColor: color.mainColor,
          tabBarInactiveTintColor: color.inactive,
        }}
        initialRouteName={'Home1'}
      >
        <Tab.Screen name="Recommandation" component={HomeNavigator} />
        <Tab.Screen name="Mes Applets" component={MyAppletsView} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
