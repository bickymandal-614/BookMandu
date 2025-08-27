import React from 'react'
import { FaFacebookF, FaInstagram,FaXTwitter   } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className='flex flex-col gap-2 bg-blue-600 px-6 md:px-8 xl:px-26 rounded-t-xl py-4'>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-white font-semibold text-xl mb-3'>Quick Links</h1>
          <ul className='text-gray-300 flex flex-col gap-2'>
            <li className='hover:text-gray-400 cursor-pointer'>Picked for you</li>
            <li className='hover:text-gray-400 cursor-pointer'>Best seller</li>
            <li className='hover:text-gray-400 cursor-pointer'>New arrivals</li>
            <li className='hover:text-gray-400 cursor-pointer'>Self-help</li>
          </ul>
        </div>
        <div>
          <h1 className='text-white font-semibold text-xl mb-3'>About</h1>
          <ul className='text-gray-300 flex flex-col gap-2'>
            <li className='hover:text-gray-400 cursor-pointer'>About us</li>
            <li className='hover:text-gray-400 cursor-pointer'>Contact us</li>
            
          </ul>
        </div>
        <div>
          <h1 className='text-white font-semibold text-xl mb-3'>Genres</h1>
          <ul className='text-gray-300 flex flex-col gap-2'>
            <li className='hover:text-gray-400 cursor-pointer'>Science fiction</li>
            <li className='hover:text-gray-400 cursor-pointer'>Thillers</li>
            <li className='hover:text-gray-400 cursor-pointer'>Romance</li>
            <li className='hover:text-gray-400 cursor-pointer'>History</li>
            <li className='hover:text-gray-400 cursor-pointer'>Horror</li>
            <li className='hover:text-gray-400 cursor-pointer'>Business</li>
          </ul>
        </div>
        <div>
          <h1 className='text-white font-semibold text-xl mb-3'>Others</h1>
          <ul className='text-gray-300 flex flex-col gap-2'>
          <li className='hover:text-gray-400 cursor-pointer'>FAQ's</li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-3'>
        <div className='flex text-xl gap-4 text-gray-300 hover:cursor-pointer'>
          <FaFacebookF />
          <FaInstagram />
          <FaXTwitter />
          <FaYoutube />
        </div>
        <div className='flex gap-6 text-[14px] text-gray-300'>
          <p>@BookMandu 2025. All right Reserved.</p>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Footer