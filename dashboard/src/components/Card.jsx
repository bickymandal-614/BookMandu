import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import {
  fetchBooksfailure,
  fetchBooksStart,
  fetchBooksSuccess,
} from "../../../client/src/store/bookSlice/index.js";

const Card = () => {
  const { books } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const fetchBooks = async () => {
    try {
      dispatch(fetchBooksStart());
      const response = await axios.get("http://localhost:3000/api/v1/books/all-books", {
        withCredentials: true,
      });
      dispatch(fetchBooksSuccess(response.data.book));
    } catch (err) {
      dispatch(
        fetchBooksfailure({
          status: err.response?.status,
          message: err.response?.data?.message,
        })
      );
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/books/delete-book/${id}`,
        { withCredentials: true }
      );
      toast.success(res?.data?.message || "Book deleted", { autoClose: 2000 });
      fetchBooks(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [dispatch]);

  return (
    <div className="mt-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(books) &&
          books.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                to={`/books/${item.category}/${item.title}`}
                state={{ id: item._id }}
                className="block"
              >
                <img
                  src={item.coverImage}
                  alt="book"
                  className="h-50 w-full object-cover rounded-t-xl"
                />
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
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    deleteBook(item._id);
                  }}
                  className="flex gap-2 items-center justify-center bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <p>Delete book</p>
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
