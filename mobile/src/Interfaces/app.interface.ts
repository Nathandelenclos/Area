interface IColor extends IColorScheme, ICommon {}

export type ICommon = {
  dropDownColor: string;
  inactive: string;
};

export type IColorScheme = {
  mode: string;
  background: string;
  text: string;
  mainColor: string;
  textOverMainColor: string;
  title: string;
  subtitle: string;
  textInput: string;
};

export type ILanguage = {
  name: string;
  message: string;
};

export type IApplicationContext = {
  color: IColor;
  language: ILanguage[];
  translate: (key: string) => string;
  appName: string;
};
