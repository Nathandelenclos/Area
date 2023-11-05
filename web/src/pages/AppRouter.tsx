import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Routes as routes } from "@src/routes";
import React, { useEffect } from "react";
import GlobalContext from "@src/context/GlobalContextProvider";
import { toast } from "react-toastify";

export default function AppRouter() {
  const { user } = GlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

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
