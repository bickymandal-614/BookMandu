import axios from 'axios'
import React, { useEffect } from 'react'
import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchBooksfailure, fetchBooksStart, fetchBooksSuccess } from '../store/bookSlice'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa6'
import { CiHeart } from 'react-icons/ci'

const Favourite = () => {
    const {books} = useSelector((state)=> state.book)
    const dispatch = useDispatch()
    const fetchBooks = async () => {
      try {
        dispatch(fetchBooksStart());
        const response = await axios.get(
          "http://localhost:3000/api/v1/books/all-books",
          { withCredentials: true }
        );
        dispatch(fetchBooksSuccess(response.data.book));
      } catch (err) {
        dispatch(
          fetchBooksfailure({
            status: err.response.status,
            message: err.response?.data?.message,
          })
        );
      }
    };
    
    useEffect(()=>{
      fetchBooks();
    },[dispatch])

      const handleFavourite=async(id)=>{
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/books/make-favourite/${id}`,{withCredentials: true})
            toast.success(response.data.message,{autoClose: 2000})
            fetchBooks();
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-4 px-6 md:px-8 xl:px-26 pt-24 md:pt-58 xl:pt-40 z-10">
  {Array.isArray(books) &&
    books.filter((item) => item.favourite).map((item) => (
      <Link key={item._id}>
        <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
          <div className="relative">
            <img
              src={item.coverImage}
              alt="book image"
              className="h-50 w-full object-cover rounded-t-xl"
            />
            <button 
              onClick={() => handleFavourite(item._id)}
              className="absolute top-2 right-2 p-1 rounded-full shadow hover:bg-red-100 transition">
              {item.favourite ? (
                <FaHeart className="text-2xl text-red-500 cursor-pointer" />
              ) : (
                <CiHeart className="text-white text-2xl hover:text-red-500 cursor-pointer" />
              )}
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-1">{item.author}</p>
            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {item.title}
            </h2>
            <div className="flex justify-between items-center mt-4">
              <p className="text-md font-bold text-black">
                Rs. {item.newPrice}
                <span className="text-red-500 text-[10px] mx-2 line-through">
                  Rs. {item.oldPrice}
                </span>
              </p>
              <button className="bg-blue-100 px-2 py-1 rounded-md">
                <PiShoppingCartSimpleLight className="text-2xl cursor-pointer hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    ))}
</div>

    </>
  )
}

export default Favourite