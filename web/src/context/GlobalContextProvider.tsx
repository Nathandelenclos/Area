import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { lang, LangType, Language } from "@src/lang";
import { UserObject, UserObjectDto } from "@src/objects/UserObject";
import { AuthServices } from "@services/AuthServices";
import LoadingElement from "@components/LoadingElement";

/**
 * AppContextType type for the AppContextProvider.
 * @interface AppContextType
 */
export type GlobalContextType = {
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
export const GlobalBaseContext = createContext<GlobalContextType>({
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
type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: FC<GlobalContextProviderProps> = ({
  children,
}: GlobalContextProviderProps) => {
  const [language, setLang] = useState<Language>("fr");
  const [user, setUser] = useState<UserObject>(
    new UserObject({} as UserObjectDto),
  );
  const [loading, setLoading] = useState<boolean>(true);

  const defaultValues: GlobalContextType = {
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

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setLang(lang as Language);
    }
    (async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const data = await AuthServices.me(token);
        if (data.status === 200) {
          setUser(
            new UserObject({
              email: data.data.email,
              name: data.data.name,
              token,
              oauth: data.data.oauth,
            }),
          );
        }
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingElement />
      </div>
    );
  }

  return (
    <GlobalBaseContext.Provider value={defaultValues}>
      {children}
    </GlobalBaseContext.Provider>
  );
};

const GlobalContext: () => GlobalContextType = () =>
  React.useContext(GlobalBaseContext);
export default GlobalContext;
