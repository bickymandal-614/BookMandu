import React, { useState } from 'react';
import loginLogo from '../assets/bgImage.jpg';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';

const Register = () => {
  const [name,setName]= useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]= useState("")

  const navigate = useNavigate()

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/register",{name,email,password},{withCredentials: true})
      toast.success(response.data.message, {autoClose: 2000})
      setName("")
      setEmail("")
      setPassword("")
      navigate('/')
    } catch (err) {
      toast.error(err.response.data.message, {autoClose: 2000})
    }
  }
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${loginLogo})` }} 
    >
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl px-8 py-10 rounded-2xl max-w-md w-full font-sans border border-white/30">
        <div className="text-3xl text-center mb-4 font-bold font-serif tracking-wide italic text-white drop-shadow">
          Book<span className="text-blue-400">Mandu</span>
        </div>
        <h1 className="text-xl font-bold text-white mb-4 text-center">Welcome To Register Page.</h1>
        <form 
        onSubmit={(e)=> handleSubmit(e)}
        className="flex flex-col gap-3"
        >
          <label className="font-semibold text-white">Name:</label>
          <input
            type="text"
            onChange={(e)=> setName(e.target.value)}
            value={name}
            className="bg-white/70 placeholder-gray-600 text-black rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
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
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-white/70 placeholder-gray-600 text-black rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-2 text-white rounded-xl mt-4 font-semibold cursor-pointer transition duration-200"
            value="Register"
          />
        </form>
        <p className="text-[13px] mt-4 text-white text-center">
          Already Have An Account?{' '}
          <button
           className="font-bold text-blue-300 hover:text-blue-200 cursor-pointer"
           onClick={()=>navigate('/login')}
           >
            Login Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
