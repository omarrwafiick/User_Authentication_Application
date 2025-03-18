import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import SubmitButton from '../components/SubmitButton'
import toaster from 'react-hot-toast'

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['','','','','','']); 
  const { error, verifyEmailRequest } = useAuthStore();
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if(value.length > 1){
      const pasteCode = value.slice(0, 6).split("");
      for(let i = 0; i < 6; i++){
        newCode[i]=pasteCode[i] || "";
      }
      setCode(newCode);
      //focus on last element
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    }
    else{
      newCode[index] = value;
      setCode(newCode);
      if(value && index < 5){
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if(e.key === "Backspace" && !code[index] && index > 0){
      inputRefs.current[index-1].focus();
    }
  };
 
  useEffect(()=>{
    if(code.every(num => num !== "")){
      
      const VerifyEmail = async () => {
        try {
          await handleSubmit( new Event('submit') );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      VerifyEmail();
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try { 
      await verifyEmailRequest({verificationCode});
      navigate("/");
      toaster.success("Email verified successfully");
      } catch (error) {
        toaster.error(`Error : ${error}`);
      }
  }

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden'>
        <motion.div
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden'>
            <h2 className='text-3xl pt-5 text-white font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transpare bg-clip-text capitalize'>
                verify your email
            </h2>
            <p className='text-center text-gray-300 mb-6'>Please enter the 6 digits sent to you via email</p>
            <form onSubmit={handleSubmit} className='space-y-6 p-8'>
                <div className='flex justify-between'>
                  {
                    code.map((num, index) => {
                      return (<input 
                        className='w-12 h-12 text-center text-2xl m-1 font-bold bg-gray-700 text-white border-2 border-gray-200
                        rounded-lg focus:border-green-500 focus:outline-none'
                        key={index} 
                        ref={ (el)=> inputRefs.current[index]  = el }
                        type='text' 
                        maxLength='6'
                        value={num}
                        required
                        onChange={(e)=>{ handleChange(index, e.target.value)}}
                        onKeyDown={(e)=>{ handleKeyDown(index, e)}}
                      />) 
                    })
                  }
                </div>

                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
 
                <SubmitButton name={"verify email"} /> 
            </form>
        </motion.div>
    </div>
  )
}

export default EmailVerificationPage
