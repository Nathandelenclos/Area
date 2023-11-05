import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { JSX } from 'react';
import Home from '@views/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '@views/Settings';
import AppContext from '@contexts/app.context';
import MyAppletsView from '@views/MyApplets';
import CreateApplet from '@views/CreateApplet/CreateApplet';
import InfoApplet from '@views/InfoApplet';
import ListServices from '@views/CreateApplet/ListServices';
import ListActions from '@views/CreateApplet/ListActions';
import ConfigActions from '@views/CreateApplet/ConfigActions';
import ChangeURL from '@views/ChangeURL';
import Profile from '@views/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyAppletNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={'MyApplets'}
    >
      <Stack.Screen name="MyApplets" component={MyAppletsView} />
      <Stack.Screen name="CreateApplet" component={CreateApplet} />
      <Stack.Screen name="InfoApplet" component={InfoApplet} />
      <Stack.Screen name={'ListServices'} component={ListServices} />
      <Stack.Screen name={'ListActions'} component={ListActions} />
      <Stack.Screen name={'ConfigAction'} component={ConfigActions} />
    </Stack.Navigator>
  );
}

function RecommandationNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="InfoApplet" component={InfoApplet} />
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
      initialRouteName={'Profile'}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="ChangeURL" component={ChangeURL} />
    </Stack.Navigator>
  );
}

export default function AppNavigator(): JSX.Element {
  const { color } = AppContext();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconType: IconPrefix = focused ? 'fas' : 'far';
            let iconName: IconName;

            if (route.name === 'Recommandation') {
              iconName = 'thumbs-up';
            } else if (route.name === 'Mes Applets') {
              iconType = 'fas';
              iconName = 'link';
            } else {
              iconName = 'user';
            }

            // You can return any component that you like here!
            return (
              <FontAwesomeIcon
                size={size}
                color={color}
                icon={[iconType, iconName]}
              />
            );
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.mode,
          },
          tabBarActiveTintColor: color.mainColor,
          tabBarInactiveTintColor: color.inactive,
        })}
        initialRouteName={'Mes Applets'}
      >
        <Tab.Screen name="Recommandation" component={RecommandationNavigator} />
        <Tab.Screen name="Mes Applets" component={MyAppletNavigator} />
        <Tab.Screen name="Profil" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
