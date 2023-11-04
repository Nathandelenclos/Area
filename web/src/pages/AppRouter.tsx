import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Routes as routes } from "@src/routes";
import React, { useEffect } from "react";
import AppContext from "@src/context/AppContextProvider";
import { toast } from "react-toastify";

/**
 * AppRouter that manages the routes of the application.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <AppRouter />
 *
 * @returns {JSX.Element} Component.
 */
export default function AppRouter() {
  const { user } = AppContext();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Check if the user is already logged in.
   * If the user is already logged in, redirect him to the welcome page.
   */
  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.path === location.pathname,
    );

    if (
      Object.keys(user.data).length === 0 &&
      !localStorage.getItem("accessToken") &&
      !currentRoute?.public
    ) {
      toast("You must be logged in to access this page", {
        type: "error",
        autoClose: 5000,
      });
      navigate("/");
    }
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
