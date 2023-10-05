import React from 'react';
import { Link } from 'react-router-dom';
import OtherConnectionsOptionsSeparator from './OtherConnectionOptionsSeparator';
import OtherConnectionsButtons from './OtherConnectionsButtons';
import SignInForms from './SignInForms';

function SignInMainComponent() {
  return (
    <div className='bg-white rounded-3xl absolute h-auto w-3/12 z-10'>
      <h1 className='text-4xl font-bold my-10'>Sign In</h1>
      <SignInForms />
      <OtherConnectionsOptionsSeparator />
      <OtherConnectionsButtons />
    </div>
  )
}

export default SignInMainComponent;
