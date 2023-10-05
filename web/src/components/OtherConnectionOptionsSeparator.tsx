import React from 'react';
import {Link} from 'react-router-dom';

function OtherConnectionsOptionsSeparator() {
  return (
    <div className='w-full justify-center items-center flex'>
      <div className='flex flex-row justify-center items-center w-10/12'>
        <div className='border-2 w-4/6 border-[#DBDBDB]'></div>
        <text className='text-center text-[#B7B7B7] w-4/5'>Or connect using</text>
        <div className='border-2 w-4/6 border-[#DBDBDB]'></div>
      </div>
    </div>
  )
}

export default OtherConnectionsOptionsSeparator;
