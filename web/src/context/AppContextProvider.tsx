import React, { createContext, FC, ReactNode } from "react";

type AppContextProviderType = {
  children: ReactNode;
};

export type AppContextType = {
  test: string;
};

export const ApplicationContext = createContext<AppContextType>({
  test: "test",
});
export const AppContextProvider: FC<AppContextProviderType> = ({
  children,
}: AppContextProviderType) => {
  return (
    <ApplicationContext.Provider
      value={{
        test: "test",
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

const AppContext = () => React.useContext(ApplicationContext);

export default AppContext;
