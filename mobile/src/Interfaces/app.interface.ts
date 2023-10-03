export interface IColorScheme {
  mode: string;
  background: string;
  text: string;
  mainColor: string;
  textOverMainColor: string;
  title: string;
  subtitle: string;
  textInput: string;
}

export interface ILanguage {
  name: string;
  message: string;
}

export interface IApplicationContext {
  color: IColorScheme;
  language: ILanguage[];
  translate: (key: string) => string;
  appName: string;
}
