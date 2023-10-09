import { Route } from "@interfaces/Route";
import Welcome from "@pages/Auth/Welcome";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import CreateAppletTrigger from "@pages/CreateAppletTrigger";
import CreateAppletReaction from "@pages/CreateAppletReaction";
import RecoverPassword from "@pages/Auth/RecoverPassword";
import GoogleOAuth from "./pages/GoogleOAuth";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";

export const Routes: Route[] = [
  {
    name: "home",
    path: "/",
    middleware: [],
    element: <Welcome />,
  },
  {
    name: "sign-in",
    path: "/sign-in",
    middleware: [],
    element: <SignIn />,
  },
  {
    name: "sign-up",
    path: "/sign-up",
    middleware: [],
    element: <SignUp />,
  },
  {
    name: "recover-password",
    path: "/sign-in/recover-password",
    middleware: [],
    element: <RecoverPassword />,
  },
  {
    name: "create-applet-trigger",
    path: "/create-applet-trigger",
    middleware: [],
    element: <CreateAppletTrigger />,
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
    name: "profile",
    path: "/profile",
    middleware: [],
    element: <Profile />,
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
  | "create-applet-trigger"
  | "create-applet-reaction";
