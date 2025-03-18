import React from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore' 
import { Loader} from 'lucide-react'

const SubmitButton = ({name}) => {
  const {isLoading} = useAuthStore();
  return (
    <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold capitalize
        rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        focus:ring-offset-gray-900 transition duration-200 cursor-pointer'  
        type='submit'
        disabled={isLoading}
        whileHover={{scale:1.02}}
        whileTap={{scale:0.98}} >
        { isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'></Loader> : `${name}`}
    </motion.button>   
  )
}

export default SubmitButton
