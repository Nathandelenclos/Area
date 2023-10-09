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
    element: <CreateApplet />,
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
  | "sign-in"
  | "sign-up"
  | "404"
  | "recover-password"
  | "create-applet"
  | "my-applets";
