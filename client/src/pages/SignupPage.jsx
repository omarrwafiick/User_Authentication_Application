import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import {motion} from 'framer-motion'
import CustomeInput from '../components/CustomeInput'
import CustomePasswordInput from '../components/CustomePasswordInput'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'
import { User, Mail, Lock, Loader } from 'lucide-react'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import toaster from 'react-hot-toast'
import SubmitButton from '../components/SubmitButton'

const SignupPage = () => { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signupRequest, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      if(password === confirmPassword){ 
        try {
          await signupRequest({email, password, name});
          navigate("/verify-email");
          toaster.success("Signed up successfully");
        } catch (error) {
          toaster.error(`Error : ${error}`);
        }
      }
      else{
        toaster.error("Passwords doesn't match");
        return;
      }
    };

  return (
    <motion.div
      initial={{opacity: 0, y:20}}
      animate={{opacity: 1, y:0}}
      transition={{duration:0.5}}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl text-white font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transpare bg-clip-text capitalize'>
          create new account
        </h2>
        <form onSubmit={handleSubmit}>
          <CustomeInput icon={User} type="text" placeholder="Full Name" required value={name} onChange={ (e) => setName(e.target.value) }/>
          <CustomeInput icon={Mail} type="email" placeholder="Email" required value={email} onChange={ (e) => setEmail(e.target.value) }/>  
          <CustomePasswordInput icon={Lock} placeholder="Password" required value={password} onChange={ (e) => setPassword(e.target.value) }/>   
          <CustomePasswordInput icon={Lock} placeholder="Confirm Password" required value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) }/>   
          
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <PasswordStrengthMeter password={password} />
           
          <SubmitButton name={"sign up"} />  
        </form>
      </div> 
      <div className='flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50'>
        <p className='capitalize text-sm text-gray-400'>
          already have an account? {" "}
          <Link to={"/login"} className='text-green-400 hover:underline'>login</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignupPage
