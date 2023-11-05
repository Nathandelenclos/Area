import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '@views/Settings';
import AppContext from '@contexts/app.context';
import MyAppletsView from '@views/MyApplets';
import CreateApplet from '@views/CreateApplet/CreateApplet';
import ListServices from '@views/CreateApplet/ListServices';
import ListActions from '@views/CreateApplet/ListActions';
import ConfigActions from '@views/CreateApplet/ConfigActions';
import ChangeURL from '@views/ChangeURL';
import Profile from '@views/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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
      <Stack.Screen name={'ListServices'} component={ListServices} />
      <Stack.Screen name={'ListActions'} component={ListActions} />
      <Stack.Screen name={'ConfigAction'} component={ConfigActions} />
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
      initialRouteName={'ProfilePage'}
    >
      <Stack.Screen name="ProfilePage" component={Profile} />
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="ChangeURL" component={ChangeURL} />
    </Stack.Navigator>
  );
}

export default function AppNavigator(): JSX.Element {
  const { color, translate } = AppContext();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconType: IconPrefix = focused ? 'fas' : 'far';
            let iconName: IconName;

            if (route.name === translate('mes_applet')) {
              iconType = 'fas';
              iconName = 'link';
            } else {
              iconName = 'user';
            }
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
        <Tab.Screen
          name={translate('mes_applet')}
          component={MyAppletNavigator}
        />
        <Tab.Screen name={translate('profile')} component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
