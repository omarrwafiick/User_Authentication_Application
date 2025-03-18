import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import CustomePasswordInput from '../components/CustomePasswordInput'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  
import { Lock } from 'lucide-react'
import SubmitButton from '../components/SubmitButton'
import toaster from 'react-hot-toast'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { ResetPasswordRequest, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(password !== confirmPassword){
      toaster.error("Passwords does't match");
      return;
    }
    else{ 
      try { 
        await ResetPasswordRequest({token, password});
        toaster.success("Passwords was reseted successfully");  
        navigate("/login");
      } catch (error) {
        toaster.error(`${error.message}`);
        setPassword("");
        setConfirmPassword("");
      } 
    }
  }
  return (
      <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl text-white font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transpare bg-clip-text capitalize'>
                  reset password
                </h2>
               
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                <form onSubmit={handleSubmit}>   
                  <CustomePasswordInput icon={Lock} placeholder="Password" required value={password} onChange={ (e) => setPassword(e.target.value) }/>   
                  <CustomePasswordInput icon={Lock} placeholder="Confirm Password" required value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) }/>   

                  {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                  <SubmitButton name={"reset password"} />        
                </form>
            </div>
      </motion.div>
  )
}

export default ResetPasswordPage
