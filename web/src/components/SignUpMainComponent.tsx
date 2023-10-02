import React from 'react';

function SignUpMainComponent() {
  return (
    <div className='bg-white rounded-3xl absolute h-auto w-3/12 z-10'>
      <h1 className='text-4xl font-bold my-10'>Sign Up</h1>
      <div className='flex flex-col justify-center items-center'>
          <input
            className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
            type="text"
            placeholder='Full Name'
          />
          <input
            className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
            type="text"
            placeholder='Email'
          />
          <input
            className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-5"
            type="password"
            placeholder='Password'
          />
        <button className='bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded mt-10 mb-5'>Sign up</button>
        <p className='w-3/5'>By creating an account you accept our <a className='text-[#7A73E7]'>Terms of services</a> and <a className='text-[#7A73E7]'>Privacy policy</a>.</p>
      </div>
      <div className='w-full justify-center items-center flex mt-5'>
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

export default SignUpMainComponent;
