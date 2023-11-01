import React, { JSX } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Settings } from 'react-native-fbsdk-next';
import { FACEBOOK_APP_ID } from '@env';
import { ApplicationProvider } from '@contexts/app.context';
import { UserProvider } from '@contexts/user.context';
import DefineNavigator from '@navigators/define.navigator';
import Toast from 'react-native-toast-message';
import SettingsPage from '@views/Settings';

console.log('FACEBOOK_APP_ID', FACEBOOK_APP_ID);

library.add(fas);
library.add(fab);
library.add(far);
Settings.setAppID(FACEBOOK_APP_ID);

function App(): JSX.Element {
  return (
    <>
      <ApplicationProvider>
        <UserProvider>
          {/* <DefineNavigator /> */}
          <SettingsPage />
        </UserProvider>
      </ApplicationProvider>
      <Toast />
    </>
  );
}

export default App;
