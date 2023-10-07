import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Routes as routes } from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.name} {...route} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
