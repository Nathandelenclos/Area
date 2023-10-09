import { Route } from "@interfaces/Route";
import Welcome from "@pages/Auth/Welcome";
import SignIn from "@pages/Auth/SignIn";
import SignUp from "@pages/Auth/SignUp";
import CreateApplet from "@pages/CreateApplet";
import RecoverPassword from "@pages/Auth/RecoverPassword";
import MyApplet from "@pages/MyApplet";

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
    name: "applets",
    path: "/applets",
    middleware: [],
    element: <MyApplet />,
  },
  {
    name: "create-applet",
    path: "/create-applet",
    middleware: [],
    element: <CreateApplet />,
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
  | "sign-in"
  | "sign-up"
  | "404"
  | "recover-password"
  | "create-applet"
  | "applets";
