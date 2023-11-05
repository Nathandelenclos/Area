import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

type AuthItem = {
  color: string;
  icon: [IconPrefix, IconName];
  OAuth: (arg0: boolean, token: string) => void;
  provider: string;
  name?: string;
};

const AUTH_LIST: AuthItem[] = [
  {
    icon: ["fab", "facebook"],
    color: "#3b5998",
    OAuth: (connect, token) => console.log("Facebook OAuth", connect, token),
    provider: "facebook",
  },
  {
    icon: ["fab", "google"],
    color: "#db4437",
    OAuth: (connect, token) => console.log("Google OAuth", connect, token),
    provider: "google",
  },
  {
    icon: ["fab", "spotify"],
    color: "#1db954",
    OAuth: (connect, token) => console.log("Spotify OAuth", connect, token),
    provider: "spotify",
  },
  {
    icon: ["fab", "github"],
    color: "#24292e",
    OAuth: (connect, token) => console.log("Github OAuth", connect, token),
    provider: "github",
  },
];

export { AUTH_LIST };
export type { AuthItem };
