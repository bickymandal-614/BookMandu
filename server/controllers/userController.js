const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const registerCtrl =async(req,res)=>{
    try {
        const {name,email,password}= req.body;
        if(!name || !email || !password) return res.status(400).json({message: "Please provide all details."})
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "Email already exists"})
        if(name.length <3) return res.staus(400).json({message: "User name length must be 3 character or long."})
        const hashPassword =await bcrypt.hash(password,10)
        const newUser = new User({name,email,password:hashPassword})
        await newUser.save()
        res.status(200).json({message: "User created successfully.",newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const loginCtrl = async(req,res)=>{
    try {
        const {email, password, role}=req.body
        if(!email || !password || !role) return res.status(400).json({message: "Please provide all details."})
        const user = await User.findOne({email,role})
        if(!user) return res.status(400).json({message: `User not found with this ${role} role and email.`})
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword) return res.status(400).json({message: "Invalid Creaditionals"})
        const userId = user._id
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"})
        res.cookie("jwt",token,{httpOnly: true})
        await User.findByIdAndUpdate(userId,{token})
        res.status(200).json({message: "Login Successful.",token,user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const logOutCtrl = async(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({message: "Logout Successful."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getMyProfile =async(req,res)=>{
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message: "Token missing."})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({message: "Token not matched"})
        const user = await User.findById(decoded.userId)
        return res.status(200).json({user})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {registerCtrl,loginCtrl,logOutCtrl,getMyProfile}