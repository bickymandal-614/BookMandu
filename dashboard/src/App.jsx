import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify";
import PrivateRoutes from './components/PrivateRoutes';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../client/src/store/authSlice/index.js';
import AddBook from './pages/AddBook.jsx';
import Card from './components/Card.jsx';
import BookDetails from './pages/BookDetails.jsx';
import UpdateBook from './pages/UpdateBook.jsx';
import Orders from './pages/Orders.jsx';

const App = () => {
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route index element={<Card />} />
              <Route path="/orders" element={<Orders />} />
              <Route path='add-books' element={<AddBook />} />
              <Route path="books/:category/:title" element={<BookDetails />} />
              <Route path="/update-book/:id" element={<UpdateBook />} />
            </Route>
          </Route>
        </Routes>
         <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App