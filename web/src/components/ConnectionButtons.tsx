import React from 'react';
import {Link} from 'react-router-dom';

function ConnectionButtons() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Link to="/sign-in" className='bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded mt-10 mb-5'>
        <button>Sign in</button>
      </Link>
      <Link to="/sign-up" className='bg-white hover:border-[#9490ce] text-[#7A73E7] hover:text-[#9490ce] text-2xl font-bold w-4/5 py-5 rounded mt-5 mb-10 border-4 border-[#7A73E7]'>
        <button>Sign up</button>
      </Link>
    </div>
  )
}

export default ConnectionButtons;
