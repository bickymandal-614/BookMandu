const { initOrder, getMyOrder, getAllOrders, updateOrderstatus } = require("../controllers/orderController")
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/checkout", isAuthenticated, initOrder)
router.put("/update-status/:id",isAuthenticated, updateOrderstatus)
router.get("/all-orders",isAuthenticated,getAllOrders)
router.get("/my-orders", isAuthenticated, getMyOrder)
module.exports = router