import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Routes as routes } from "@src/routes";
import React, { useEffect } from "react";
import AppContext from "@src/context/AppContextProvider";

export default function AppRouter() {
  const { user } = AppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.path === location.pathname,
    );

    if (!user && !currentRoute?.public) navigate("/sign-in");
  }, [user, location.pathname, navigate]);

  return (
    <Routes>
      {routes.map((route) => {
        if (!user && !route.public) return null;
        return <Route key={route.name} {...route} />;
      })}
    </Routes>
  );
}
