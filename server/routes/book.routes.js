const { addBookCtrl, deleteBookCtrl, updateBookCtrl, getAllBooks, getSingleBook, makeFavourite } = require("../controllers/bookController")
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware")

const router= require("express").Router()

router.post("/add-book",isAuthenticated,isAdmin("admin"),addBookCtrl)
router.delete("/delete-book/:id",isAuthenticated,isAdmin("admin"),deleteBookCtrl )
router.put("/update-book/:id",isAuthenticated,isAdmin("admin"),updateBookCtrl)
router.get("/all-books",isAuthenticated,getAllBooks)
router.get("/get-single-book/:id",isAuthenticated,getSingleBook)
router.get("/make-favourite/:id",isAuthenticated,makeFavourite)

module.exports = router