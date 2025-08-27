import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchBooksfailure,fetchBooksStart,fetchBooksSuccess,} from "../../store/bookSlice";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { addToCart } from "../../store/cartSlice";

const Books = () => {
  const { books} = useSelector((state) => state.book);
  const {items} = useSelector((state)=> state.cart)
  const dispatch = useDispatch();

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


  const handleFavourite=async(e,id)=>{
    e.preventDefault()
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/books/make-favourite/${id}`,{withCredentials: true})
        toast.success(response.data.message,{autoClose: 2000})
        fetchBooks();
    } catch (error) {
      console.log(error)
    }
  }

  const handleCart =(e,book)=>{
    e.preventDefault()
    const existing = items.find((item)=> item._id === book._id)
    if(existing){
      toast.error("Book already added to cart.",{autoClose: 2000})
    }else{
    dispatch(addToCart(book))
    toast.success("Book added to cart.",{autoClose:2000})
    }
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 850 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  return (
    <>
      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-3">Picked for you</h1>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={false}
          autoPlay={false}
          transitionDuration={300}
          showDots={true}
          arrows={false}
        >
          {Array.isArray(books) &&
            books.map((item) => (
              <Link 
              to={`/books/${item.category}/${item.title}`}
              state={{id: item._id}}
              key={item._id}>
                <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden mx-3 md:mx-2 group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={item.coverImage}
                      alt="book image"
                      className="h-50 w-full object-cover rounded-t-xl"
                    />
                    <button 
                    onClick={(e)=> handleFavourite(e,item._id)}
                    className="absolute top-2 right-2  p-1 rounded-full shadow hover:bg-red-100 transition">
                      {item.favourite?(<FaHeart  className="text-2xl text-red-500 cursor-pointer" />):(<CiHeart className="text-white text-2xl hover:text-red-500 cursor-pointer" />)}
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
                      <button 
                      onClick={(e)=> handleCart(e,item)}
                      className="bg-blue-100 px-2 py-1 rounded-md cursor-pointer">
                        <PiShoppingCartSimpleLight className="text-2xl hover:text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Carousel>
      </div>
      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-3">Best self improvment book on BookMandu</h1>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={false}
          autoPlay={false}
          transitionDuration={300}
          showDots={true}
          arrows={false}
        >
          {Array.isArray(books) &&
            books
             .filter((item) => item.category.toLowerCase() === 'self-help')
            .map((item) => (
              <Link
              to={`/books/${item.category}/${item.title}`}
              state={{id: item._id}}
              key={item._id}>
                <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden mx-3 md:mx-2 group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={item.coverImage}
                      alt="book image"
                      className="h-50 w-full object-cover rounded-t-xl"
                    />
                    <button 
                    onClick={(e)=> handleFavourite(e,item._id)}
                    className="absolute top-2 right-2  p-1 rounded-full shadow hover:bg-red-100 transition">
                      {item.favourite?(<FaHeart  className="text-2xl text-red-500 cursor-pointer" />):(<CiHeart className="text-white text-2xl hover:text-red-500 cursor-pointer" />)}
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
                      <button 
                      onClick={(e)=> handleCart(e,item)}
                      className="bg-blue-100 px-2 py-1 rounded-md cursor-pointer">
                        <PiShoppingCartSimpleLight className="text-2xl hover:text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Carousel>
      </div>
      <div className="mt-12 pb-4">
        <h1 className="text-2xl font-bold mb-3">New listing on BookMandu</h1>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={false}
          autoPlay={false}
          transitionDuration={300}
          showDots={true}
          arrows={false}
        >
          {Array.isArray(books) &&
            books.map((item) => (
              <Link key={item._id}>
                <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden mx-3 md:mx-2 group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={item.coverImage}
                      alt="book image"
                      className="h-50 w-full object-cover rounded-t-xl"
                    />
                    <button 
                    onClick={(e)=> handleFavourite(e,item._id)}
                    className="absolute top-2 right-2  p-1 rounded-full shadow hover:bg-red-100 transition">
                      {item.favourite?(<FaHeart  className="text-2xl text-red-500 cursor-pointer" />):(<CiHeart className="text-white text-2xl hover:text-red-500 cursor-pointer" />)}
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
                      <button 
                      onClick={(e)=> handleCart(e,item)}
                      className="bg-blue-100 px-2 py-1 rounded-md cursor-pointer">
                        <PiShoppingCartSimpleLight className="text-2xl hover:text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default Books;
