import { Route } from "@interfaces/Route";
import Welcome from "@pages/Auth/Welcome";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import CreateAppletAction from "@pages/CreateAppletAction";
import CreateAppletReaction from "@pages/CreateAppletReaction";
import RecoverPassword from "@pages/Auth/RecoverPassword";
import MyApplet from "@pages/MyApplet";
import GoogleOAuth from "./pages/GoogleOAuth";
import HomePage from "./pages/HomePage";

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
    name: "create-applet-trigger",
    path: "/create-applet-trigger",
    middleware: [],
    element: <CreateAppletAction />,
  },
  {
    name: "create-applet-reaction",
    path: "/create-applet-reaction",
    middleware: [],
    element: <CreateAppletReaction />,
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
  },
  {
    name: "my-applets",
    path: "/applets",
    middleware: [],
    element: <MyApplet />,
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
  | "create-applet-trigger"
  | "create-applet-reaction";
