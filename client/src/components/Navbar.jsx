import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";
import { removeFromCart } from "../store/cartSlice";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [fav, setFav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { totalItems, items } = useSelector((state) => state.cart);
  const { books } = useSelector((state) => state.book);

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
      .filter((book) => book.distance <= 4); 

    setSearchResults(filtered);
  };


   const wrapperRef = useRef(null);
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
  
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/my-cart" || location.pathname==="/checkout") {
      setShowCart(false);
    }
    if (location.pathname === "/") {
      setFav(false);
    }if(location.pathname === "/my-orders"){
      setShowPersonalInfo(false)
    }
  }, [location]);

  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Category", link: "/category" },
    { id: 3, text: "New ", link: "/new-arrivals" },
    { id: 4, text: "About", link: "/about" },
    { id: 5, text: "Contact", link: "/contact" },
  ];

  const categoryItem = [
    { id: 1, text: "Self-Help" },
    { id: 2, text: "Sci-Fi" },
    { id: 3, text: "Thrillers" },
    { id: 4, text: "Romance" },
    { id: 5, text: "History" },
    { id: 6, text: "Horror" },
    { id: 7, text: "Mystery" },
    { id: 8, text: "Business" },
    { id: 9, text: "Poetry" },
    { id: 10, text: "CookBooks" },
  ];

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

  const handleFavourite = () => {
    setFav((prev) => !prev);
    if (fav === false) {
      navigate("/favourite-books");
    } else {
      navigate("/");
    }
  };

  const handleCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.newPrice, 0);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md py-6 xl:py-4 px-6 md:px-8 xl:px-26 flex flex-col  justify-between">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => navigate("/")}
            className="text-xl md:text-3xl font-bold font-serif tracking-wide italic cursor-pointer"
          >
            Book<span className="text-blue-500">Mandu</span>
          </button>
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

          <div className="flex">
            <div className="flex items-center gap-4 xl:gap-10">
              <h1 className="hidden xl:block text-xl font-bold text-gray-500 hover:text-blue-600 cursor-pointer">
                About
              </h1>
              <button onClick={() => setShowPersonalInfo(!showPersonalInfo)}>
                <CiUser
                  className={`text-3xl cursor-pointer ${
                    showPersonalInfo &&
                    "bg-blue-400 text-white rounded-full p-1"
                  } hover:text-blue-600`}
                />
              </button>
              {showPersonalInfo && (
                <div className="absolute bg-gray-100 top-18 md:top-18 xl:right-33 md:right-6 flex flex-col text-nowrap p-4 shadow-xl rounded-md">
                  
                  <div className="absolute -top-2 right-32 xl:right-[125px] w-4 h-4 bg-gray-100 rotate-45"></div>
                  <button
                  onClick={()=> navigate("/my-orders")}
                  className="flex w-full items-center gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-sm">
                    <FaBorderAll />
                    <h1>My Orders</h1>
                  </button>
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-sm"
                  >
                    <RiLogoutCircleRLine className="text-[19px]" />
                    <h1>Logout</h1>
                  </button>
                </div>
              )}

              <button
                onClick={handleFavourite}
                className={`${fav && " text-blue-600"} rounded-full p-1 `}
              >
                <CiHeart className="hidden xl:block text-3xl cursor-pointer " />
              </button>
              <div className="relative">
                <button onClick={() => setShowCart((prev) => !prev)}>
                  <PiShoppingCartSimpleLight
                    className={`text-3xl cursor-pointer ${
                      showCart && "text-blue-600"
                    } ${
                      location.pathname === "/my-cart" && "text-blue-600"
                    } hover:text-blue-600`}
                  />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                    {totalItems}
                  </span>
                </button>
              </div>
              <div
                className={`absolute  top-17 right-6 md:top-18 xl:right-25 md:right-8 ${
                  showCart ? "flex" : "hidden"
                } flex-col gap-2 bg-gray-200 rounded-md shadow-xl p-3`}
              >
                <div className="flex  items-center justify-between mb-2">
                  <h1 className="font-bold text-2xl">My cart</h1>
                  <button
                    onClick={() => setShowCart((prev) => !prev)}
                    className="text-2xl hover:cursor-pointer"
                  >
                    <RxCross2 />
                  </button>
                </div>
                <div className="absolute -top-[8px]  right-16 md:right-16  xl:right-[4px] w-4 h-4 bg-gray-200 rotate-45"></div>
                {showCart &&
                  items.map((item) => (
                    <div
                      key={item._id}
                      className=" flex items-center gap-4  w-full px-4 py-2 rounded-md bg-white"
                    >
                      <div>
                        <img
                          src={item.coverImage}
                          alt="book image"
                          className="w-24 rounded-xl"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <h1 className="font-bold text-xl">{item.title}</h1>
                          <button
                            onClick={() => handleCart(item._id)}
                            className="hover:cursor-pointer"
                          >
                            {" "}
                            <RxCross2 />
                          </button>
                        </div>
                        <p className="text-[14px] text-gray-600">
                          Author: {item.author}
                        </p>
                        <p className="text-[14px] text-green-500">
                          Rs. {item.newPrice}{" "}
                          <span className="text-[12px] text-red-500 ml-2 line-through">
                            {item.oldPrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                <div className=" bg-white rounded-md">
                  <div className=" flex items-center justify-between px-2 mt-2">
                    <h1 className="font-semibold text-xl">Subtotal</h1>
                    <p className="text-green-600 ">Rs. {subtotal}</p>
                  </div>
                  <div className="p-2 mt-2 flex items-center justify-between">
                    <button
                      onClick={() => navigate("/my-cart")}
                      className="bg-blue-100 px-6 py-2 rounded-full cursor-pointer hover:bg-blue-200"
                    >
                      View Cart
                    </button>
                    <button 
                    onClick={()=>navigate("/checkout")}
                    className="bg-blue-600 px-6 py-2 rounded-full cursor-pointer hover:bg-blue-500 font-semibold text-white">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:hidden ml-6">
              <button onClick={() => setShowNav(!showNav)}>
                {showNav ? (
                  <IoMdClose className="text-3xl" />
                ) : (
                  <GiHamburgerMenu className="text-3xl" />
                )}
              </button>
            </div>

            <div
              className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-md transform transition-transform duration-300 z-50 ${
                showNav ? "translate-x-0" : "-translate-x-full"
              } xl:hidden`}
            >
              <div className="p-6 space-y-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.link}
                    onClick={() => setShowNav(false)}
                    className="block text-gray-800 text-lg hover:text-blue-500"
                  >
                    {item.text}
                  </NavLink>
                ))}
              </div>
            </div>

            {showNav && (
              <div
                className="fixed inset-0 bg-transparent bg-opacity-30 z-40 xl:hidden"
                onClick={() => setShowNav(false)}
              ></div>
            )}
          </div>
        </div>
          <div
      ref={wrapperRef}
      className="flex xl:hidden items-center gap-4 mt-2 md:mt-4 w-full"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="outline-none border rounded-l-xl py-[10px] pl-3 w-full border-r-0"
        />
        <button className="text-xl px-3 py-3 border border-l-0 rounded-r-xl cursor-pointer absolute right-0 top-0 bottom-0">
          <CiSearch />
        </button>

        {searchTerm && searchResults.length > 0 && (
          <div className="absolute top-[48px] left-0 w-full max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg z-[100]">
            {searchResults.map((book) => (
              <Link
                key={book._id}
                      to={`/books/${book.category}/${book.title}`}
                      state={{ id: book._id }}
                className="flex items-center gap-4 p-3 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-[15px]">{book.title}</h3>
                  <p className="text-sm text-gray-500">by {book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div className="absolute top-[48px] left-0 w-full bg-white shadow-lg rounded-lg z-[100] p-3 text-gray-500">
            No results found.
          </div>
        )}
      </div>
    </div>
        <div className="overflow-x-auto">
          <div className="hidden md:flex gap-14 mt-6 xl:mt-4 whitespace-nowrap">
            {categoryItem.map((item) => (
              <button
                key={item.id}
                className="text-gray-500 font-semibold cursor-pointer hover:bg-blue-100 rounded-full px-2 py-1"
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto  bg-gray-50">
        <div className="flex gap-8 md:hidden m-4 mt-6 md:px-30  whitespace-nowrap">
          {categoryItem.map((item) => (
            <button
              key={item.id}
              className="text-gray-500 text-[15px] font-semibold bg-white border border-gray-300 rounded-full px-2 py-1"
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
