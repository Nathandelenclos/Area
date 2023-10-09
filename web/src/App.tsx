import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "@pages/AppRouter";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
