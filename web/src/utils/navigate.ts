import { Route } from "@interfaces/Route";
import { RouteNames, Routes } from "@src/routes";

export function navigate(name: RouteNames): void {
  const route: Route | undefined = Routes.find((route) => route.name === name);
  if (route === undefined) {
    navigate("404");
  }
  if (
    (route as Route).middleware?.reduce((acc, middleware) => {
      return middleware() && acc;
    }, true)
  ) {
    window.location.href = (route as Route).path;
  }
  return;
}
