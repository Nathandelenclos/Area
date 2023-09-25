import React, {createContext} from 'react';

export const ApplicationContext = createContext<any>({
  color: 'white',
  language: 'en',
});

export const ApplicationProvider = (props: {children: any}) => {
    const value = {
        color: 'white',
        language: 'en',
    }
  return (
    <ApplicationContext.Provider value={value}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

const AppContext = () => React.useContext(ApplicationContext);
export default AppContext;
