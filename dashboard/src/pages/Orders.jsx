import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/order/all-orders",
        { withCredentials: true }
      );
      setOrders(response?.data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatus = async (e, id) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/order/update-status/${id}`,
        { status: newStatus }, 
        { withCredentials: true }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      toast.success(response?.data?.message, {autoClose: 2000})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between text-xl font-semibold border-b mb-2">
        <div className="flex gap-40 text-xl font-semibold mb-2">
          <p>Order Id</p>
          <p>Books</p>
        </div>
        <div className="flex gap-12">
          <p>Quantity</p>
          <p>Price</p>
          <p>Total Price</p>
          <p>Status</p>
        </div>
      </div>

      <div>
        {Array.isArray(orders) &&
          orders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between items-center border-b mt-4"
            >
              <div className="flex gap-9 items-center">
                <p>{order._id}</p>
                <div>
                  {Array.isArray(order.productIds) &&
                    order.productIds.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-2 pb-2"
                      >
                        <img
                          className="w-22 h-16 rounded-md"
                          src={item.coverImage}
                          alt={item.title}
                        />
                        <div>
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {item.title}
                          </p>
                          <p>
                            <span className="font-semibold">Author:</span>{" "}
                            {item.author}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex justify-between gap-18">
                <div className="flex flex-col gap-6">
                  {Array.isArray(order.productIds) &&
                    order.productIds.map((item, idx) => <p key={idx}>1</p>)}
                </div>

                <div className="flex flex-col gap-[26px]">
                  {Array.isArray(order.productIds) &&
                    order.productIds.map((item) => (
                      <p key={item._id}>{item.newPrice}</p>
                    ))}
                </div>

                <p>{order.totalPrice}</p>
                <select
                  value={order.status}
                  onChange={(e) => handleStatus(e, order._id)}
                  className={`${order.status == "Confirmed"? "text-green-600":order.status== "Cancelled"? "text-red-600":"text-black"} rounded-md text-center`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
