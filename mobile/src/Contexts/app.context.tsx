import React, { createContext, useEffect } from 'react';
import { NativeModules, Platform, useColorScheme } from 'react-native';
import { IApplicationContext, LanguageKeys } from '@interfaces/app.interface';
import { black, common, white } from './color.keys';
import { languageList } from './language.keys';

export const ApplicationContext = createContext<IApplicationContext>({
  color: { ...white, ...common },
  language: [],
  translate: (key: string) => key,
  appName: '',
});

export const ApplicationProvider = (props: { children: any }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [language, setLanguage] = React.useState<LanguageKeys>(languageList.fr);

  const getLanguage = () => {
    let deviceLanguage;
    if (Platform.OS === 'ios') {
      deviceLanguage =
        NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0];
    } else {
      deviceLanguage = NativeModules.I18nManager.localeIdentifier;
    }
    const lang = deviceLanguage.substring(0, 2);
  };

  const translate = (key: string) => {
    return language[key] || key;
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const value: IApplicationContext = {
    color: { ...(isDarkMode ? black : white), ...common },
    language: language,
    translate: translate,
    appName: 'React Native Template',
  };

  return (
    <ApplicationContext.Provider value={value}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

const AppContext = () => React.useContext(ApplicationContext);
export default AppContext;
