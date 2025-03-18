import React,{useState} from 'react'
import {motion} from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { Link } from 'react-router-dom' 
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom';
import CustomeInput from '../components/CustomeInput' 
import CustomePasswordInput from '../components/CustomePasswordInput'
import toaster from 'react-hot-toast'
import SubmitButton from '../components/SubmitButton'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, LoginRequest } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await LoginRequest({ email, password });
        toaster.success("Logged-in successfully"); 
        navigate("/");
        console.log("Navigation triggered");
    } catch (error) {
        toaster.error(`Error: ${error}`); 
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
              welcome back!
            </h2>
            <form onSubmit={handleSubmit}> 
              <CustomeInput icon={Mail} type="email" placeholder="Email" required value={email} onChange={ (e) => setEmail(e.target.value) }/>
              <CustomePasswordInput icon={Lock} placeholder="Password" required value={password} onChange={ (e) => setPassword(e.target.value) }/>   
              
              <div className='flex justify-start mb-3 -mt-2'>
                <Link to={"/forget-password"} className='text-sm text-green-400/80 hover:underline'>forget password?</Link>   
              </div>

              {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
 
              <SubmitButton name={"login"} />        
            </form> 
          </div>
          
          <div className='flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50'>
            <p className='capitalize text-sm text-gray-400'>
              don't have an account? {" "}
              <Link to={"/signup"} className='text-green-400 hover:underline'>sign up</Link>
            </p>
          </div>
        </motion.div> 
  )
}

export default LoginPage
