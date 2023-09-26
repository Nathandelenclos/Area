import React, {createContext, useEffect} from 'react';
import {NativeModules, Platform, useColorScheme} from "react-native";
import {IApplicationContext, ILanguage} from "../Interfaces/app.interface";
import {black, white} from "./color.keys";
import {languageList} from "./language.keys";

export const ApplicationContext = createContext<IApplicationContext>({
    color: white,
    language: [],
    translate: (key: string) => key,
});

export const ApplicationProvider = (props: { children: any }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [language, setLanguage] = React.useState<ILanguage[]>(languageList.fr);

    const getLanguage = () => {
        let deviceLanguage;
        if (Platform.OS === 'ios') {
            deviceLanguage = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
        } else {
            deviceLanguage = NativeModules.I18nManager.localeIdentifier;
        }
        const lang = deviceLanguage.substring(0, 2);
    };

    const translate = (key: string) => {
        return language.find(item => item.name === key)?.message || key;
    }

    useEffect(() => {
        getLanguage();
    }, []);

    const value: IApplicationContext = {
        color: isDarkMode ? black : white,
        language: language,
        translate: translate,
    }

    return (
        <ApplicationContext.Provider value={value}>
            {props.children}
        </ApplicationContext.Provider>
    );
};

const AppContext = () => React.useContext(ApplicationContext);
export default AppContext;
