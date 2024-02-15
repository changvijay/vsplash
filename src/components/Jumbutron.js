import React from 'react'
import  {tsParticles} from "tsparticles-engine";

const Jumbutron = ({ children }) => {
  
  return (
    <div id={tsParticles}>
    <div className="bg-gray-900  bg-info flex items-center py-10">
      <div className='max-w-md mx-auto w-full'>
        <h1 className='text-white text-center text-2xl font-bold mb-5'>Vsplash</h1>
        {children}
      </div>
    </div>
    </div>
  )
}

export default Jumbutron