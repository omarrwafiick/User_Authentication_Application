import React, { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

const CustomePasswordInput = ({icon:Icon,...props}) => {
  const [showPass, setShowPass] = useState(false);
  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <div className='relative mb-6 flex flex-col items-center justify-between'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className="size-5 text-green-500"></Icon>
        </div>
        <input {...props} 
            type={showPass ? 'text' : 'password'}
            className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 
            focus:ring-green-500 focus:ring-2 text-white placeholder-gray-400 transition duration-200'
        />  
        <p onClick={handleShowPassword} className='absolute flex items-center inset-y-0 right-0 pr-3 text-xl h-full text-white cursor-pointer hover:text-green-500 duration-300'>
            {showPass ? <EyeClosed className="size-6" /> : <Eye className="size-6" />} 
        </p>
    </div>
  )
}

export default CustomePasswordInput
