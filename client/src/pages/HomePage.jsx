import React from 'react'
import { useAuthStore } from '../store/authStore'
import {motion} from 'framer-motion'
import SubmitButton from '../components/SubmitButton'

const HomePage = () => {
  const { LogOutRequest, user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LogOutRequest();
  };
  return ( 
        <motion.div
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5}}
          className='max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden'
        >
          <div className='p-8'>
            
            <div>
              <h2 className='text-2xl mb-2 text-green-500 capitalize'>profile information</h2>
              <p className='text-gray-300 mb-1 capitalize'>name : {user?.name}</p>
              <p className='text-gray-300 mb-1 capitalize'>email : {user?.email}</p>
              <p className='text-gray-300 capitalize'>last login : {user?.lastLogin ? user?.lastLogin : "you just signed up!"}</p> 
            </div>
            <form onSubmit={handleSubmit}><SubmitButton name={"log out"} /> </form> 
          </div> 
        </motion.div>     
  )
}

export default HomePage
