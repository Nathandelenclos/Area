import React from 'react';
import {Link} from 'react-router-dom';
import ConnectionButtons from './ConnectionButtons';
import OtherConnectionsOptionsSeparator from './OtherConnectionOptionsSeparator';
import OtherConnectionsButtons from './OtherConnectionsButtons';

function MainComponent() {
  return (
    <div className='bg-white rounded-3xl absolute h-auto w-3/12 z-10'>
      <h1 className='text-4xl font-bold mt-20 mb-10'>Welcome to App Name</h1>
      <ConnectionButtons />
      <OtherConnectionsOptionsSeparator />
      <OtherConnectionsButtons />
    </div>
  )
}

export default MainComponent;
