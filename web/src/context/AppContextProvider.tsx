import React, { createContext, FC, ReactNode, useState } from "react";
import { lang, LangType, Language } from "@src/lang";
import { UserObject, UserObjectDto } from "@src/objects/UserObject";

/**
 * AppContextType type for the AppContextProvider.
 * @interface AppContextType
 */
export type AppContextType = {
  /**
   * Language of the app.
   */
  language: Language;
  /**
   * Name of the app.
   */
  appName: string;
  /**
   * Translate function.
   * @param keys - Keys to translate.
   * @returns - translated string.
   */
  translate: (...keys: string[]) => string;
  /**
   * Set the language of the app.
   * @param language - Language to set.
   * @returns - void
   */
  setLanguage: (language: Language) => void;
  /**
   * User object.
   */
  user: UserObject;
  /**
   * Set the user object.
   * @param user - User object to set.
   * @returns - void
   */
  setUser: (user: UserObject) => void;
};

/**
 * ApplicationContext is a context provider for the app.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <ApplicationContext.Provider value={defaultValues}>
 *   <App />
 * </AppContextProvider>
 *
 * @param {AppContextProviderProps} props - list of every services offered.
 * @returns {JSX.Element} Rendered component.
 */
export const ApplicationContext = createContext<AppContextType>({
  /**
   * Language of the app.
   */
  language: "en",
  /**
   * Name of the app.
   */
  appName: "AppName",
  /**
   * Translate function.
   * @param keys - Keys to translate.
   * @returns - translated string.
   */
  translate: (...keys: string[]): string => keys.join(" "),
  /**
   * Set the language of the app.
   * @param language - Language to set.
   * @returns - void
   */
  setLanguage: (language: Language) => language,
  /**
   * User object.
   */
  user: new UserObject({} as UserObjectDto),
  /**
   * Set the user object.
   * @param user - User object to set.
   * @returns - void
   */
  setUser: (user: UserObject) => user,
});

/**
 * AppContextProviderProps props for the AppContextProvider components.
 * @interface AppContextProviderProps
 */
type AppContextProviderProps = {
  children: ReactNode;
};

/**
 * AppContextProvider component displays the app context.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <AppContextProvider>
 *   <App />
 * </AppContextProvider>
 *
 * @param {AppContextProviderProps} props - list of every services offered.
 * @returns {JSX.Element} Rendered component.
 */
export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [language, setLang] = useState<Language>("fr");
  const [user, setUser] = useState<UserObject>(
    new UserObject({} as UserObjectDto),
  );

  const defaultValues: AppContextType = {
    language,
    appName: "AppName",
    translate: (...keys: string[]): string => {
      return keys.reduce((acc: LangType | string, key: string) => {
        if (typeof acc === "object") {
          return acc[key];
        }
        return "";
      }, lang[language]) as string;
    },
    setLanguage: (language: Language) => {
      setLang(language);
    },
    user,
    setUser,
  };

  return (
    <ApplicationContext.Provider value={defaultValues}>
      {children}
    </ApplicationContext.Provider>
  );
};

const AppContext: () => AppContextType = () =>
  React.useContext(ApplicationContext);
export default AppContext;
