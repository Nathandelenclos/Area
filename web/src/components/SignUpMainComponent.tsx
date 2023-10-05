import React from 'react';
import OtherConnectionsOptionsSeparator from './OtherConnectionOptionsSeparator';
import OtherConnectionsButtons from './OtherConnectionsButtons';
import SignUpForms from './SignUpForms';

function SignUpMainComponent() {
  return (
    <div className='bg-white rounded-3xl absolute h-auto w-3/12 z-10'>
      <h1 className='text-4xl font-bold my-10'>Sign Up</h1>
      <SignUpForms />
      <OtherConnectionsOptionsSeparator />
      <OtherConnectionsButtons />
    </div>
  )
}

export default SignUpMainComponent;
