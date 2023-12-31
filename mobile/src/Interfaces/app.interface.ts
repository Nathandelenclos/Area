import React from 'react';

interface IColor extends IColorScheme, ICommon {}

export type ICommon = {
  dropDownColor: string;
  inactive: string;
  textInputPlaceholder: string;
};

export type IColorScheme = {
  mode: string;
  inverseMode: string;
  background: string;
  text: string;
  mainColor: string;
  textOverMainColor: string;
  title: string;
  subtitle: string;
  textInput: string;
};

export type IApplicationContext = {
  color: IColor;
  language: string;
  translate: (key: string) => string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  appName: string;
};

export type LanguageKeys = {
  [key: string]: string;
};
