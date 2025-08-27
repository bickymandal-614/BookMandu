const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const { json } = require("express")

const isAuthenticated =async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(404).json({message: "Token not found."})
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({message: "Token not matched."})
        const user = await User.findById(decoded.userId)
        if(!user) return res.status(404).json({message: "User not found."})
        req.user=user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server errro while authenticating user."})
    }
}

const isAdmin=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req?.user.role)){
            return res.status(403).json({message: `You are not allowed to access with this ${req?.user.role} role.`})
        }
        next()
    }
}
module.exports = {isAuthenticated, isAdmin}