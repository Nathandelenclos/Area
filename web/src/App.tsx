import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "@pages/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
