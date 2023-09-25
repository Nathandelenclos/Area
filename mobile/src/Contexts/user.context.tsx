import React, {createContext} from 'react';

export const UserContext = createContext<any>({
    user: {
        name: '',
        email: '',
        password: '',
    }
});

export const UserProvider = (props: {children: any}) => {
    const value = {
        user: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '123456',
        }
    }
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

const GetMe = () => React.useContext(UserContext);
export default GetMe;
