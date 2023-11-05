import { IColorScheme, ICommon } from '@interfaces/app.interface';
export const common: ICommon = {
  dropDownColor: '#d9d9d9',
  inactive: 'gray',
  textInputPlaceholder: '#d9d9d9',
};

export const white: IColorScheme = {
  mode: 'white',
  inverseMode: 'black',
  background: '#dfe1e5',
  text: 'black',
  mainColor: '#7a73e7',
  textOverMainColor: 'white',
  title: 'black',
  subtitle: 'gray',
  textInput: '#f1f1f1',
};

export const black: IColorScheme = {
  mode: 'black',
  inverseMode: 'white',
  background: '#201e1a',
  text: 'white',
  mainColor: '#7a73e7',
  textOverMainColor: 'white',
  title: 'white',
  subtitle: 'gray',
  textInput: '#1e1e1e',
};
