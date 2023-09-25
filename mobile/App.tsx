import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from "@fortawesome/free-brands-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {ApplicationProvider} from "./src/Contexts/app.context";
import DefineNavigator from "./src/Navigators/define.navigator";
import {UserProvider} from "./src/Contexts/user.context";

library.add(fas);
library.add(fab);
library.add(far);


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <ApplicationProvider>
        <UserProvider>
          <DefineNavigator />
        </UserProvider>
      </ApplicationProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
