import React from 'react';
import {Link} from 'react-router-dom';

function OtherConnectionsButtons() {
  return (
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
  )
}

export default OtherConnectionsButtons;
