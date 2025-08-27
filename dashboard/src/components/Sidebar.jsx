import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";
import { FaBorderAll } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../../client/src/store/authSlice";
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()

   const handleLogOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/logout",
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/login");
      toast.success(response.data.message, { autoClose: 2000 });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-col fixed top-0 left-0 justify-between w-[20%] bg-gray-200 px-4 py-4 h-screen">
        <div>
        <button
          onClick={() => navigate("/")}
          className="text-xl md:text-3xl font-bold font-serif italic cursor-pointer"
        >
          Book<span className="text-blue-500">Mandu</span>
        </button>
        </div>
        <div className="text-[18px] font-semibold text-gray-600">
            <ul className="flex flex-col gap-1">
              <li 
              onClick={()=> navigate('/')}
              className={`${(location.pathname== "/")&& "text-blue-500"} flex items-center gap-2 cursor-pointer`}><FaBook size={16}/> <span>All books</span></li>
              <li className=" flex items-center gap-2 cursor-pointer"><FaBookmark size={16}/> <span>Recently added</span></li>
            </ul>
        </div>
        <div>
            <h1 className="flex items-center gap-2 text-[18px] font-semibold text-gray-600 mb-1"><ImUserTie /><span>Author</span></h1>
            <ul className="ml-7">
                <li> Pierce Brown</li>
                <li> Andy Weir</li>
                <li>Dete Meserve</li>
                <li>Ray Bradbury</li>
                <li>James Clear</li>
                <li>Others</li>
            </ul>
        </div>
        <div>
            <h1 className="flex items-center gap-2 text-[18px] font-semibold text-gray-600 mb-1"><BiSolidCategory /><span>Categories</span></h1>
            <ul className="ml-7 flex flex-col gap-1">
                <li>Self-Help</li>
                <li>Sci-Fi</li>
                <li>Thrillers</li>
                <li>History</li>
                <li>Business</li>
                <li>Others</li>
            </ul>
        </div>
        <div className="text-[18px] font-semibold text-gray-600">
          <ul className="flex flex-col gap-1">
            <li 
            onClick={()=> navigate("/orders")}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-700"><FaBorderAll size={16} /><span
            >Orders</span></li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-700"><IoSettingsSharp size={17} /><span>Settings</span></li>
            <li 
            onClick={handleLogOut}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-700"> <BiLogOut /><span>Logout</span></li>
          </ul>
        </div>
      </div>
    </>
  );
}; 

export default Sidebar;
