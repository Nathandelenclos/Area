import React from 'react';

function mainComponent() {
  return (
    <div className='bg-white rounded-3xl absolute h-auto w-3/12 z-10'>
      <h1 className='text-4xl font-bold mt-20 mb-10'>Welcome to App Name</h1>
      <div className='flex flex-col justify-center items-center'>
        <button className='bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded mt-10 mb-5'>Sign in</button>
        <button className='bg-white hover:border-[#9490ce] text-[#7A73E7] hover:text-[#9490ce] text-2xl font-bold w-4/5 py-5 rounded mt-5 mb-10 border-4 border-[#7A73E7]'>Sign up</button>
      </div>
      <div className='w-full justify-center items-center flex'>
        <div className='flex flex-row justify-center items-center w-10/12'>
          <div className='border-2 w-4/6 border-[#DBDBDB]'></div>
          <text className='text-center text-[#B7B7B7] w-4/5'>Or connect using</text>
          <div className='border-2 w-4/6 border-[#DBDBDB]'></div>
        </div>
      </div>
      <div className='w-full justify-evenly items-center flex flex-row mt-5'>
        <div>
          <button className='justify-center items-center flex bg-[#3B5998] hover:bg-[#4e6aa3] text-white text-base font-bold w-1/6 px-6 py-2 rounded mt-5 mb-10'>F</button>
        </div>
        <div>
          <button className='justify-center items-center flex bg-[#DB4437] hover:bg-[#e26e68] text-white text-base font-bold w-1/6 px-6 py-2 rounded mt-5 mb-10'>G</button>
        </div>
        <div>
          <button className='justify-center items-center flex bg-[#00ACEE] hover:bg-[#6cc4e9] text-white text-base font-bold w-1/6 px-6 py-2 rounded mt-5 mb-10'>X</button>
        </div>
      </div>
    </div>
  )
}

export default mainComponent;
