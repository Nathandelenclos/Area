import React from 'react';
import '../App.css';
import MainComponent from '../components/HomePageMainComponent';

function App() {
  return (
    <div className="App  overflow-hidden w-full h-full flex items-center justify-center">
      <img src="/assets/vectorBackground.jpg" alt="background" className="w-full h-screen object-cover z-0"/>
      <MainComponent/>
    </div>
  );
}

export default App;
