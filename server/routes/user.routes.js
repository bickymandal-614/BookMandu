const { registerCtrl, loginCtrl, logOutCtrl, getMyProfile } = require("../controllers/userController")
const { isAuthenticated } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/register",registerCtrl)
router.post("/login",loginCtrl)
router.get("/logout",isAuthenticated,logOutCtrl)
router.get("/my-profile",isAuthenticated,getMyProfile)

module.exports = router 