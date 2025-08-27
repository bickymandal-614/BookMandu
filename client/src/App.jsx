import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import NewBooks from "./pages/NewBooks";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import PrivateRoutes from "./components/PrivateRoutes";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/authSlice";
import { ToastContainer } from "react-toastify";
import Favourite from "./pages/Favourite";
import ViewCart from "./pages/ViewCart";
import BookDetails from "./pages/BookDetails";
import MyOrder from "./pages/MyOrder";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="category" element={<Category />} />
            <Route path="new-arrivals" element={<NewBooks />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="my-orders" element={<MyOrder />} />
            <Route path="favourite-books" element={<Favourite />} />
            <Route path="my-cart" element={<ViewCart />} />
            <Route path="books/:category/:title" element={<BookDetails />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
