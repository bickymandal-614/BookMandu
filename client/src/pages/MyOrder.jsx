import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyOrder = () => {
    const [myOrder, setMyOrder]= useState([])

           const fetchOrderDetails =async()=>{
            try {
                const response = await axios.get("http://localhost:3000/api/v1/order/my-orders", {withCredentials: true})
                
                setMyOrder(response?.data?.orders)
            } catch (error) {
                console.log(error)
            }
        }
    useEffect(()=>{
       fetchOrderDetails()
    },[])
    console.log(myOrder)
  return (
   <>
    <div className='px-6 md:px-8 xl:px-26 pt-24 pb-4 md:pt-58 xl:pt-34 z-10 bg-gray-100'>
        <h1 className='text-3xl mt-4 font-bold text-center'>My orders</h1>
        <div className='mt-6'>
            <div className='flex justify-between text-xl font-semibold border-b mb-2'>
            <div className='flex gap-40 text-xl font-semibold mb-2'>
                <p>Order Id</p>
                <p>Books</p>
            </div>
            <div className='flex gap-12'>
                <p>Quantity</p>
                <p>Price</p>
                <p>Total Price</p>
                <p>Status</p>
            </div>
            </div>
            <div className=''>
                {myOrder.map((book)=> <div className='flex justify-between items-center border-b mt-4'>
                    <div className='flex  gap-9 items-center'>
                        <p>{book._id}</p>
                        <div>
                        {book.productIds.map((item) => <div className='flex items-center gap-2 pb-2'>
                            <img 
                            className='w-22 h-16 rounded-md '
                            src={item.coverImage} alt="" />
                            <div>
                            <p ><span className='font-semibold'>Name:</span> {item.title}</p>
                            <p ><span className='font-semibold'>Author: </span>{item.author}</p>
                            </div>
                        </div>)}
                        </div>
                        
                    </div>
                    <div className='flex justify-between gap-18'>
                        <div className='flex flex-col gap-6'>
                            <p>1</p>
                        </div>
                        <div className='flex flex-col gap-[26px]'>
                            {book.productIds.map((item)=> <p>{item.newPrice}</p>)}
                        </div>
                        <p>{book.totalPrice}</p>
                        <p className={`${book.status == "Confirmed"? "text-green-600":book.status== "Cancelled"? "text-red-600":"text-black"} rounded-md text-center`}>{book.status}</p>
                    </div>
                </div>)}
            </div>
        </div>
    </div>
   </>
  )
}

export default MyOrder