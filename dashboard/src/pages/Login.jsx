import React, { useEffect, useState } from 'react';
import loginLogo from '../assets/bgImage.jpg';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import { loginUser } from '../../../client/src/store/authSlice';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]= useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user,loading}= useSelector((state)=> state.auth)

  const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(loginUser({role: "admin",email,password}))
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${loginLogo})` }} 
    >
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl px-8 py-10 rounded-2xl max-w-md w-full font-sans border border-white/30">
        <div className="text-3xl text-center mb-4 font-bold font-serif tracking-wide italic text-white drop-shadow">
          Book<span className="text-blue-400">Mandu</span>
        </div>
        <h1 className="text-xl font-bold text-white mb-4 text-center">Welcome To Admin Login Page.</h1>
        <form 
        onSubmit={(e)=> handleSubmit(e)}
        className="flex flex-col gap-3"
        >
          <label className="font-semibold text-white">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="bg-white/70 placeholder-gray-600 text-black rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          <label className="font-semibold text-white">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="bg-white/70 placeholder-gray-600 text-black rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 py-2 text-white rounded-xl mt-4 font-semibold cursor-pointer transition duration-200"
            value="Login"
          >Login {loading && <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}</button>
        </form>
        <p className="text-[13px] mt-4 text-white text-center">
          Don't Have An Account?{' '}
          <button
          className="font-bold text-blue-300 hover:text-blue-200 cursor-pointer"
          onClick={()=> navigate("/register")}
          >
            Register Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
