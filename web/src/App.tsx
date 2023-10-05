import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RecoverPassword from './pages/RecoverPassword';
import Welcome from "./pages/Welcome";
import CreateApplet from "./pages/CreateApplet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in/recover-password" element={<RecoverPassword />} />
        <Route path="/create-applet" element={<CreateApplet />} />
      </Routes>
    </Router>
  );
}

export default App;
