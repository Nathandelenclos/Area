import { ILanguage } from '@interfaces/app.interface';

const fr: ILanguage[] = [
  {
    name: 'fr',
    message: 'Français',
  },
  {
    name: 'welcome_to',
    message: 'Bienvenue sur',
  },
  {
    name: 'sign_in',
    message: 'Se connecter',
  },
  {
    name: 'sign_up',
    message: "S'inscrire",
  },
  {
    name: 'sign_out',
    message: 'Se déconnecter',
  },
  {
    name: 'or_connect_with',
    message: 'Ou se connecter avec',
  },
  {
    name: 'email',
    message: 'Email',
  },
  {
    name: 'password',
    message: 'Mot de passe',
  },
  {
    name: 'forgot_password',
    message: 'Mot de passe oublié ?',
  },
  {
    name: 'full_name',
    message: 'Nom complet',
  },
  {
    name: 'to_pp',
    message: 'En vous inscrivant, vous acceptez nos',
  },
  {
    name: 'to',
    message: "Conditions d'utilisation",
  },
  {
    name: 'and',
    message: 'et',
  },
  {
    name: 'pp',
    message: 'Politique de confidentialité',
  },
  {
    name: 'recover_password',
    message: 'Récupérer le mot de passe',
  },
  {
    name: 'send_email',
    message: "Envoyer l'email",
  },
  {
    name: 'home_title',
    message: 'Recommendations du jour',
  }
];

const en: ILanguage[] = [
  {
    name: 'en',
    message: 'English',
  },
  {
    name: 'welcome_to',
    message: 'Welcome to',
  },
  {
    name: 'sign_in',
    message: 'Sign in',
  },
  {
    name: 'sign_up',
    message: 'Sign up',
  },
  {
    name: 'sign_out',
    message: 'Sign out',
  },
  {
    name: 'or_connect_with',
    message: 'Or connect with',
  },
  {
    name: 'email',
    message: 'Email',
  },
  {
    name: 'password',
    message: 'Password',
  },
  {
    name: 'forgot_password',
    message: 'Forgot password ?',
  },
  {
    name: 'full_name',
    message: 'Full name',
  },
  {
    name: 'to_pp',
    message: 'By signing up, you agree to our',
  },
  {
    name: 'to',
    message: 'Terms of service',
  },
  {
    name: 'and',
    message: 'and',
  },
  {
    name: 'pp',
    message: 'Privacy policy',
  },
  {
    name: 'recover_password',
    message: 'Recover password',
  },
  {
    name: 'send_email',
    message: 'Send email',
  },
  {
    name: 'home_title',
    message: 'Recommendations of the day',
  }
];

type LanguageList = {
  [key: string]: ILanguage[];
};

export const languageList: LanguageList = { fr, en };
