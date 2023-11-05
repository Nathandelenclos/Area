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

export type GlobalContextType = {
  language: Language;
  appName: string;
  translate: (...keys: string[]) => string;
  setLanguage: (language: Language) => void;
  user: UserObject;
  setUser: (user: UserObject) => void;
};

export const GlobalBaseContext = createContext<GlobalContextType>({
  language: "en",
  appName: "AppName",
  translate: (...keys: string[]): string => keys.join(" "),
  setLanguage: (language: Language) => language,
  user: new UserObject({} as UserObjectDto),
  setUser: (user: UserObject) => user,
});

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