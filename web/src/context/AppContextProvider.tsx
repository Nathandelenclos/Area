import React, { createContext, FC, ReactNode, useState } from "react";
import lang, { Language } from "@src/lang";
import Lang from "@src/lang";

export type AppContextType = {
  language: string;
  translate: (key: string) => string;
  setLanguage: (language: Language) => void;
};
export const ApplicationContext = createContext<AppContextType>({
  language: Language.FR,
  translate: (key: string) => key,
  setLanguage: (language: Language) => language,
});

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [language, setLang] = useState(Language.FR);

  const setLanguage = (language: Language) => {
    setLang(language);
  };

  const translate = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return lang[language][key];
  };
  return (
    <ApplicationContext.Provider
      value={{
        language,
        translate,
        setLanguage,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

const AppContext: () => AppContextType = () =>
  React.useContext(ApplicationContext);
export default AppContext;
