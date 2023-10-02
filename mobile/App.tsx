import React from 'react';
import {StyleSheet} from 'react-native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from "@fortawesome/free-brands-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {Settings} from "react-native-fbsdk-next";
import {env} from "./src/env";
import {ApplicationProvider} from "./src/Contexts/app.context";
import {UserProvider} from "./src/Contexts/user.context";
import DefineNavigator from "./src/Navigators/define.navigator";

library.add(fas);
library.add(fab);
library.add(far);
Settings.setAppID(env.FACEBOOK_APP_ID);


function App(): JSX.Element {
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
