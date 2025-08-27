import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Card from "../components/Card.jsx";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { state } = useLocation();
  const { category, title } = useParams();
  const navigate = useNavigate()
  const fetchSingleBook = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/books/get-single-book/${state.id}`,
        { withCredentials: true }
      );
      setBook(data);
    } catch (err) {
      console.error(err);
    }
  }, [state?.id]);

  useEffect(() => {
    fetchSingleBook();
  }, [fetchSingleBook]);


  

  if (!book) return null;

  return (
    <>
      <div className=" md:px-8 xl:px-26 pb-4 xl:pt-4 z-10 bg-gray-100">
        <div className="flex items-center mb-4 text-[14px] text-gray-500">
          <p>Category</p>
          <IoMdArrowDropright size="20px" />
          <p>{category}</p>
          <IoMdArrowDropright size="20px" />
          <p>{title}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-12 justify-between">
          <div className="xl:w-[55%]">
            <div className="flex flex-col gap-5 relative w-full">
              <img className="rounded-xl w-full" src={book.book.coverImage} alt="" />
              <button 
              onClick={() => navigate(`/update-book/${book?.book?._id}`)}
              className="bg-blue-500 w-full py-2 rounded-xl cursor-pointer text-white hover:bg-blue-600">Update book details</button>
            </div>
          </div>
          <div className="xl:w-[45%] bg-white rounded-xl px-8 py-4 flex flex-col gap-2">
            <h1 className="text-3xl font-bold ">{book?.book.title}</h1>
            <p className="text-gray-600 text-xl">By: <span className="text-black font-semibold">{book?.book?.author}</span></p>
            <p className="text-2xl">Price: <span className="text-green-600 font-semibold">{book?.book?.newPrice}</span> <span className="text-[16px] text-red-600 ml-2 line-through">{book?.book?.oldPrice}</span></p>
           
            <p className="font-semibold text-xl">Condition</p>
                <div className="flex gap-2">
                   <p className="font-semibold rounded-full px-8 py-1 border inline"> New</p>
                </div>
            <p className="font-semibold text-xl">Format</p>
                <div className="flex gap-2">
                  <p className="font-semibold rounded-full px-8 py-1 border inline"> Paperback</p>
                </div>
            <div>
              <h1 className="font-semibold text-xl">Description</h1>
              <div>
                {book?.book?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
