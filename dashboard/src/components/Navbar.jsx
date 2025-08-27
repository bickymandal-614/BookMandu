import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import { CiSearch, CiUser } from "react-icons/ci";
import { FaBorderAll } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../client/src/store/authSlice/index.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";


const Navbar = () => {
     const [showPersonalInfo, setShowPersonalInfo] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const { books } = useSelector((state) => state.book);
      const wrapperRef = useRef(null);

       const levenshtein = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[a.length][b.length];
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = books
      .map((book) => ({
        ...book,
        distance: levenshtein(book.title.toLowerCase(), value.toLowerCase()),
      }))
      .sort((a, b) => a.distance - b.distance)
      .filter((book) => book.distance <= 4); // Adjust threshold if needed

    setSearchResults(filtered);
  };

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="bg-gray-200 flex justify-between p-4">
         <div 
          className="relative hidden xl:flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="outline-none border rounded-l-xl py-[10px] pl-3 w-[450px] border-r-0"
            />
            <button className="text-xl px-3 py-3 border border-l-0 rounded-r-xl cursor-pointer">
              <CiSearch />
            </button>
            {searchTerm && (
              <div 
              ref={wrapperRef}
              className="absolute top-[48px] left-0 w-full max-h-[350px] overflow-y-auto bg-white shadow-lg rounded-lg z-[100]">
                {searchResults.length > 0 ? (
                  searchResults.map((book) => (
                    <Link
                      key={book._id}
                      to={`/books/${book.category}/${book.title}`}
                      state={{ id: book._id }}
                      className="flex items-center gap-4 p-3 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchResults([]);
                        setSearchTerm("");
                      }}
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-[15px]">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          by {book.author}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No results found.</div>
                )}
              </div>
            )}
          </div>
        <div className="flex gap-4 items-center">
        <button onClick={() => setShowPersonalInfo(!showPersonalInfo)}>
                        <CiUser
                          className={`text-3xl cursor-pointer ${
                            showPersonalInfo &&
                            "bg-blue-400 text-white rounded-full p-1"
                          } hover:text-blue-600`}
                        />
                      </button>
                      <button
                      onClick={()=> navigate("/add-books")}
                      className="flex gap-2 items-center bg-blue-200 px-4 py-2 rounded-xl hover:bg-blue-400  cursor-pointer">
                        <p className="text-xl font-semibold text-blue-500">Add Books</p>
                            <IoAddOutline className="text-2xl font-bold text-blue-500" />
                      </button>
                      </div>
                      {showPersonalInfo && (
                        <div className="absolute bg-gray-100 top-18 md:top-18 xl:right-33 md:right-6 flex flex-col text-nowrap p-4 shadow-xl rounded-md">
                          
                          <div className="absolute -top-2 right-32 xl:right-[70px] w-4 h-4 bg-gray-100 rotate-45"></div>
                          
                          <button
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-sm"
                          >
                            <RiLogoutCircleRLine className="text-[19px]" />
                            <h1>Logout</h1>
                          </button>
                        </div>
                      )}
      </div>
    </>
  );
};

export default Navbar;
