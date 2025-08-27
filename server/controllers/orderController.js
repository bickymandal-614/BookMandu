const Order = require("../models/order.model")

const initOrder = async(req,res)=>{
    try {
        const {name, email, phone, address, totalPrice, productIds, userId} = req.body
        if(!name || !email || !phone || !address || !totalPrice || !productIds || !userId ) return res.status(400).json({message: "Please provide all details."})
        
        const newOrder = new Order({name, email,phone, address, totalPrice, productIds, userId})
        await newOrder.save()
        res.status(200).json({message: "Order placed successfully."})
    } catch (error) {
        console.log(error)
    }
}

const getMyOrder = async(req,res)=>{
   try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }
    const orders = await Order.find({ userId })
      .populate("productIds")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

const getAllOrders =async(req,res)=>{
  try {
    const orders = await Order.find()
      .populate("productIds")
      .sort({ createdAt: -1 });
    res.status(200).json({orders})
  } catch (error) {
    console.log(error)
     res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const updateOrderstatus = async(req,res)=>{
  try {
    const {id}= req.params
    console.log(id)
    const {status}= req.body
    const order = await Order.findById(id)
    if(!order) return res.status(400).json({message: "Order not found"})
    await order.updateOne({status: status})
    res.status(200).json({message: "Order status changed."})
  } catch (error) {
    console.log(error)
  }
}
module.exports = {initOrder, getMyOrder,getAllOrders, updateOrderstatus}