import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "@pages/AppRouter";
import "react-toastify/dist/ReactToastify.css";
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
