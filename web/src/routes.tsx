import { Route } from "@interfaces/Route";
import RecoverPassword from "@pages/Auth/RecoverPassword";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import Welcome from "@pages/Auth/Welcome";
import CreateAppletAction from "@pages/CreateAppletAction";
import MyApplet from "@pages/MyApplet";
import { LoginUserFacebook } from "./pages/FacebookOauth";
import { LoginUserGithub } from "./pages/GithubOauth";
import GoogleOAuth from "./pages/GoogleOAuth";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/Loading";
import Profile from "./pages/Profile";
import { LoginUserSpotify } from "./pages/SpotifyOauth";

/**
 * Routes contains all the routes of the application.
 */
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
    name: "edit-applet",
    path: "/edit-applet/:id",
    middleware: [],
    element: <CreateAppletAction />,
  },
  {
    name: "profile",
    path: "/profile",
    middleware: [],
    element: <Profile />,
  },
  {
    name: "loading-page-spotify",
    path: "/loading-page-spotify",
    middleware: [],
    element: <LoadingPage option={false} />,
    public: true,
  },
  {
    name: "loading-page-github",
    path: "/loading-page-github",
    middleware: [],
    element: <LoadingPage option={true} />,
    public: true,
  },
  {
    name: "404",
    path: "/404",
    middleware: [],
    element: <Welcome />,
  },
];

/**
 * RouteNames contains all the route names of the application.
 */
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
