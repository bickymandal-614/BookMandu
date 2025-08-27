import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { removeFromCart } from "../store/cartSlice";

const ViewCart = () => {
  const { items, totalItems, subTotal } = useSelector((state) => state.cart);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleCart = (id)=>{
    dispatch(removeFromCart(id))
  }
  return (
    <>
      <div className="px-6 pb-4 md:px-8 xl:px-26 pt-24 md:pt-58 xl:pt-40 z-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">My Cart</h1>
        <div className="flex justify-between gap-12">
          <div className="flex flex-col gap-8 w-[50%]">
            <h1 className="text-xl">Total ({totalItems} books)</h1>
            {items.length < 0 ? (
              <Link className="flex justify-center items-center">
                No Book selected yet.
              </Link>
            ) : (
              items.map((item) => (
                <Link key={item._id}>
                  <div className="bg-white p-4 rounded-xl cursor-auto">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-4 rounded-xl w-full">
                        <div className="flex  gap-4">
                          <div>
                            <img
                              className="h-20 w-28 rounded-xl"
                              src={item.coverImage}
                              alt="book image"
                            />
                          </div>
                          <div>
                            <h1 className="text-xl font-bold">{item.title}</h1>
                            <h2>Author: {item.author}</h2>
                            <p>
                              Price: {item.newPrice}
                              <span className="text-red-600 text-[12px] line-through ml-2">
                                {item.oldPrice}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">
                            Total Amount:{" "}
                            <span className="text-green-500">
                              {item.newPrice}
                            </span>
                          </p>
                          <button className="bg-blue-200 text-blue-800 font-semibold px-4 py-2 cursor-pointer hover:bg-blue-300 rounded-full">
                            Buy now
                          </button>
                        </div>
                      </div>
                      <div>
                        <button onClick={()=> handleCart(item._id)}>
                          <RxCross2 className="text-xl cursor-pointer" />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="w-[50%]">
            <h1 className="text-xl mb-7">Order Summary</h1>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-xl">
              <div className="flex items-center justify-between text-[18px]">
                <h1>Subtotal</h1>
                <p>Rs. {subTotal}</p>
              </div>
              <div className="flex items-center justify-between text-[18px]">
                <h1>Shipping Charge</h1>
                <p>Rs. 0</p>
              </div>
              <div className="flex items-center justify-between text-[18px]">
                <h1>Tax (calculated at checkout)</h1>
                <p>Rs. ---</p>
              </div>
              <div className="flex items-center justify-between text-xl font-semibold mt-1">
                <h1>Total</h1>
                <p>{subTotal}</p>
              </div>
              <button 
              onClick={()=> navigate("/checkout")}
              className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 my-2">
                Checkout 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCart;
