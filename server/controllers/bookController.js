const { default: mongoose, mongo } = require("mongoose");
const Book = require("../models/book.model");
const cloudinary = require("cloudinary").v2;

const addBookCtrl =async(req,res)=>{
    try {
        if(!req.files || Object.keys(req.files).length ===0) return res.status(400).json({message: "Please Provide Book Cover Image."})
        const {coverImage}= req.files
    console.log(coverImage)
        const {title, author, description, category, oldPrice, newPrice}=req.body;
        if(!title || !author || !description || !category || !oldPrice || !newPrice) return res.status(400).json({message: "Please Provide All Details."})
        const allowedFormat = ["image/jpeg", "image/png"]
        if(!allowedFormat.includes(coverImage.mimetype)) return res.status(400).json({message: "Please Provide Png or Jpeg Format Cover Image."})
        const cloudinaryResponse = await cloudinary.uploader.upload(coverImage.tempFilePath)
        if(!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error)
        }
        const bookDetails = {title, author, description, category, oldPrice, newPrice, coverImage: cloudinaryResponse.url}
        await Book.create(bookDetails)
        res.status(200).json({message: "Book Added successfully."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error While Adding Book"})
    }
}

const deleteBookCtrl =async(req,res)=>{
    try {
        const {id}= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: "Invalid Book Id."})
        await Book.findByIdAndDelete(id);
        res.status(200).json({message: "Book Deleted Successfully."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error While deleting Book"})
    }
}

const updateBookCtrl = async(req,res)=>{
    try {
        const {id}= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: "Invalid Book Id."})
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new: true})
        if(!updatedBook) return res.status(404).json({message: "Book Not Found."})
        res.status(200).json({message: "Book Updated Successfully.",updatedBook})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error while updating book"})
    }
}

const getAllBooks =async(req,res)=>{
    try {
        const book= await Book.find()
        res.status(200).json({book})
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error while fetching book"})
    }
}

const getSingleBook=async(req,res)=>{
    try {
        const {id}= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: "Invalid Book Id."})
        const book= await Book.findById(id)
        if(!book) return res.status(404).json({message: "Book Not Found."})
        res.status(200).json({book})
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error while fetching book"})
    }
}

const makeFavourite =async(req,res)=>{
    try {
        const {id}= req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: "Invalid Book Id."})
        const book = await Book.findById(id)
        if(!book) return res.status(404).json({message: "Book not found."}) 
        const favBook = book.favourite
        await Book.findByIdAndUpdate(id,{favourite: !favBook})
        return res.status(200).json({message: favBook===false?"Added book to favourite.": "Removed book from favourite. "})
    } catch (error) {
        return res.status(500).json({message: "Internal server error while making favourite"})
    }
}


module.exports = {addBookCtrl,deleteBookCtrl,updateBookCtrl,getAllBooks,getSingleBook,makeFavourite}