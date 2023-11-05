import { Route } from "@interfaces/Route";
import Welcome from "@pages/Auth/Welcome";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import CreateAppletAction from "@pages/CreateAppletAction";
import RecoverPassword from "@pages/Auth/RecoverPassword";
import MyApplet from "@pages/MyApplet";
import GoogleOAuth from "./pages/GoogleOAuth";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ConfigureApplet from "./pages/ConfigureApplet";
import { LoginUserSpotify } from "./pages/SpotifyOauth";
import { LoginUserGithub } from "./pages/GithubOauth";
import { LoginUserFacebook } from "./pages/FacebookOauth";

export const Routes: Route[] = [
  {
    name: "home",
    path: "/",
    middleware: [],
    element: <Welcome />,
    public: true,
  },
  {
    name: "sign-in",
    path: "/sign-in",
    middleware: [],
    element: <SignIn />,
    public: true,
  },
  {
    name: "sign-up",
    path: "/sign-up",
    middleware: [],
    element: <SignUp />,
    public: true,
  },
  {
    name: "recover-password",
    path: "/sign-in/recover-password",
    middleware: [],
    element: <RecoverPassword />,
    public: true,
  },
  {
    name: "create-applet",
    path: "/create-applet",
    middleware: [],
    element: <CreateAppletAction />,
  },
  {
    name: "home-page",
    path: "/home-page",
    middleware: [],
    element: <HomePage />,
  },
  {
    name: "google-auth",
    path: "/api/sessions/oauth/google",
    middleware: [],
    element: <GoogleOAuth />,
    public: true,
  },
  {
    name: "facebook-auth",
    path: "/api/sessions/oauth/facebook",
    middleware: [],
    element: <LoginUserFacebook />,
    public: true,
  },
  {
    name: "github-auth",
    path: "/api/sessions/oauth/github",
    middleware: [],
    element: <LoginUserGithub />,
    public: true,
  },
  {
    name: "spotify-auth",
    path: "/api/sessions/oauth/spotify/",
    middleware: [],
    element: <LoginUserSpotify />,
    public: true,
  },
  {
    name: "my-applets",
    path: "/my-applets",
    middleware: [],
    element: <MyApplet />,
  },
  {
    name: "profile",
    path: "/profile",
    middleware: [],
    element: <Profile />,
  },
  {
    name: "configure-applet",
    path: "/configure-applet",
    middleware: [],
    element: <ConfigureApplet />,
  },
  {
    name: "404",
    path: "/404",
    middleware: [],
    element: <Welcome />,
  },
];

export type RouteNames =
  | "home"
  | "home-page"
  | "sign-in"
  | "sign-up"
  | "404"
  | "recover-password"
  | "create-applet"
  | "my-applets"
  | "create-applet"
  | "profile"
  | "configure-applet";
