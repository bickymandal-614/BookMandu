import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../store/cartSlice'

const Checkout = () => {
    const [name,setName]= useState()
    const [email, setEmail]= useState()
    const [phone,setPhone]=useState()
    const [address, setAddress]= useState()
    const [city,setCity]= useState()
    const [state,setState]= useState()
    const [zipcode,setZipcode]= useState()

    const { items, totalItems, subTotal } = useSelector((state) => state.cart);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productIds = items.map((book)=>book._id )
      const { user } = useSelector((state) => state.auth);
      const userId = user._id
    const handleCheckout =async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/order/checkout",{name, email, phone, address: {city, state, zipcode}, totalPrice: subTotal, productIds, userId}, {withCredentials: true})
            setName("")
            setEmail("")
            setPhone("")
            setAddress("")
            setCity("")
            setState("")
            setZipcode("")
            dispatch(clearCart())
            toast.success(response?.data?.message, {autoClose: 2000})
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.message, {autoClose:2000})
        }
    }
    
  return (
    <>
        <div className='px-6 md:px-8 xl:px-26 pt-24 pb-4 md:pt-58 xl:pt-34 z-10 bg-gray-100'>
            <h1 className='text-3xl mt-5 font-bold text-center'>Checkout</h1>
            <div className='flex gap-16 mt-6 mb-4'>
            <div className='w-1/2'>
                <h1 className='text-xl font-semibold text-center'>Order Details</h1>
                <form onSubmit={(e)=> handleCheckout(e)}>
                    <label className='font-semibold'> Full Name:</label>
                    <input 
                    className="w-full p-2 border rounded-lg mt-1"
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                     <label className='font-semibold'> Email:</label>
                    <input 
                    className="w-full p-2 border rounded-lg"
                    type="text"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                     <label className='font-semibold'> Contact Number:</label>
                    <input 
                    className="w-full p-2 border rounded-lg"
                    type="text"
                    value={phone}
                    onChange={(e)=> setPhone(e.target.value)}
                    />
                     <label className='font-semibold'> Address:</label>
                    <input 
                    className="w-full p-2 border rounded-lg"
                    type="text"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    />
                    <div className='flex  gap-2'>
                        <div>
                        <label className='font-semibold'> City:</label>
                    <input 
                    className="w-full p-2 border rounded-lg"
                    type="text"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    />
                    </div>
                        <div>
                        <label className='font-semibold'> State:</label>
                        <select
                        value={state}
                        onChange={(e)=> setState(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select State</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <div>
                        <label className='font-semibold'> Zipcode:</label>
                    <input 
                    className="w-full p-2 border rounded-lg"
                    type="text"
                    value={zipcode}
                    onChange={(e)=> setZipcode(e.target.value)}
                    />
                    </div>
                    </div>
                </form>
            </div>
            <div className='w-1/2'>
                <div className='flex flex-col gap-2'>
                    <div className=' flex justify-between font-semibold text-xl'>
                        <p>Books <span className='text-[14px] font-normal'>(total books {totalItems})</span></p>
                        <div className='flex gap-5'>
                        <p>Quantity</p>
                        <p>Price</p>
                        <p>Total Price</p>
                        </div>
                    </div>
                    <hr className='mb-2'/>
                    {items.map((book)=> <div className='flex justify-between items-center border-b border-b-gray-400 '>
                        <div className='flex items-center gap-2 pb-2'>
                            <img 
                            className='w-22 h-16 rounded-md '
                            src={book.coverImage} alt="" />
                            <div>
                            <p ><span className='font-semibold'>Name:</span> {book.title}</p>
                            <p ><span className='font-semibold'>Author: </span>{book.author}</p>
                            </div>
                        </div>
                        <div className='flex gap-20'>
                            <p>1</p>
                            <p>{book.newPrice}</p>
                            <p>{book.newPrice}</p>
                        </div>
                    </div>)}
                    <p className='font-semibold'>Payment method: Cash on delivery</p>
                    <div className='flex justify-between text-xl font-semibold'>
                        <h1 className=' '>Total Price</h1>
                        <p> Rs. {subTotal}</p>
                    </div>
                    <button 
                    type='submit'
                    onClick={(e)=> handleCheckout(e)}
                    className='p-2 mt-2 bg-blue-600 rounded-md text-white cursor-pointer hover:bg-blue-700'
                    >Place Order</button>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Checkout