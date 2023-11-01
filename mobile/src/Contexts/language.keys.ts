import { LanguageKeys } from '@interfaces/app.interface';

const fr: LanguageKeys = {
  fr: 'Français',
  welcome_to: 'Bienvenue sur',
  sign_in: 'Se connecter',
  sign_up: "S'inscrire",
  sign_out: 'Se déconnecter',
  or_connect_with: 'Ou se connecter avec',
  email: 'Email',
  password: 'Mot de passe',
  forgot_password: 'Mot de passe oublié ?',
  full_name: 'Nom complet',
  to_pp: 'En vous inscrivant, vous acceptez nos',
  to: "Conditions d'utilisation",
  and: 'et',
  pp: 'Politique de confidentialité',
  recover_password: 'Récupérer le mot de passe',
  send_email: "Envoyer l'email",
  description: 'Description',
  no_applet: "Vous n'avez pas d'applet. Cliquez ici pour en créer un",
  home_title: 'Recommendations du jour',
  create_applet_title: "Création d'Applet",
  info_applet_title: "Infos sur l'Applet",
  select_service: 'Selectionnez un service',
  select_action: 'Selectionnez une action',
  select_reaction: 'Selectionnez une réaction',
  save: 'Sauvegarder',
  moddify_app_url: 'Modifier l\'APP URL',
  moddify_app_language: 'Modifier l\'App Langage',
  save_settings: 'Sauvegarder',
};

const en: LanguageKeys = {
  en: 'English',
  welcome_to: 'Welcome to',
  sign_in: 'Sign in',
  sign_up: 'Sign up',
  sign_out: 'Sign out',
  or_connect_with: 'Or connect with',
  email: 'Email',
  password: 'Password',
  forgot_password: 'Forgot password ?',
  full_name: 'Full name',
  to_pp: 'By signing up, you agree to our',
  to: 'Terms of service',
  and: 'and',
  pp: 'Privacy policy',
  recover_password: 'Recover password',
  send_email: 'Send email',
  description: 'Description',
  no_applet: 'You have no applets. Click here to create one',
  home_title: 'Recommendations of the day',
  create_applet_title: 'Applet creation',
  info_applet_title: 'Applet information',
  select_service: 'Select a service',
  select_action: 'Select an action',
  select_reaction: 'Select a reaction',
  save: 'Save',
  moddify_app_url: 'Modify App URL',
  moddify_app_language: 'Modify App Language',
  save_settings: 'Save changes',
};

type LanguageList = {
  fr: LanguageKeys;
  en: LanguageKeys;
};

export const languageList: LanguageList = { fr, en };
