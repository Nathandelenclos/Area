import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App  overflow-hidden w-full h-full flex items-center justify-center">
      <img src="/assets/vectorBackground.jpg" alt="background" className=" w-full h-screen object-cover z-0"/>
      <div className='bg-white rounded-3xl absolute h-3/5 w-4/12 z-10'>
        <h1 className='text-4xl font-bold my-10'>Welcome to App Name</h1>
        
      </div>
    </div>
  );
}

export default App;
