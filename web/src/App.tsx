import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "@pages/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
