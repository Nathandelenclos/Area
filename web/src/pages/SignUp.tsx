import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import SignUpMainComponent from '../components/SignUpMainComponent'

function SignUp() {
  return (
    <div className="App overflow-hidden w-full h-full flex items-center justify-center">
      <img src="/assets/vectorBackground.jpg" alt="background" className="w-full h-screen object-cover z-0"/>
      <SignUpMainComponent />
    </div>
  );
}

export default SignUp;
