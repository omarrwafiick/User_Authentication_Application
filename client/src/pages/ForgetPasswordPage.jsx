import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { Mail, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom' 
import CustomeInput from '../components/CustomeInput' 
import SubmitButton from '../components/SubmitButton' 

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setSubmittState] = useState(false);
  const { ForgetPasswordRequest } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ForgetPasswordRequest( { email });
    setSubmittState(true);
  }

  return (
    <motion.div
        initial={{opacity: 0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{duration:0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-3xl text-white font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transpare bg-clip-text capitalize'>
              forget password
            </h2>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}> 
                  <p className='text-center text-gray-300 mb-6'>Please enter your email and we will send you a link to reset password</p>
                  <CustomeInput icon={Mail} type="email" placeholder="Email" required value={email} onChange={ (e) => setEmail(e.target.value) }/>
     
                  <SubmitButton name={"send reset link"} />            
                </form>
            ) : (
                <div className='text-center'>
                <motion.div
                    initial={{opacity: 0, y:20}}
                    animate={{opacity: 1, y:0}}
                    transition={{type: "spring", stiffness: 500, damping: 30}}
                    className='max-w-md w-full overflow-hidden flex justify-center items-center'>
                        <Mail className='w-14 h-14 mb-3 text-white' />
                </motion.div>
                <p className='text-gray-300 mb-6'>You will receive a password reset link shortly</p>
                </div> 
            ) }
            <div className='px-8 py-4 mt-5 bg-gray-900 bg-opacity-50 flex justify-center rounded-lg'>
                <Link to={"/login"} className='text-sm text-green-400 hover:underline flex items-center capitalize'>
                    <ArrowLeft className='h-4 w-4 mr-2' />back to login
                </Link>
            </div>
        </div>    
    </motion.div>
  )
}

export default ForgetPasswordPage
