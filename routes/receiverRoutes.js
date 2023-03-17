const router = require("express").Router();
const authController = require('../controller/ReceiverController/authController')


router.get("/register",authController.showRegisterPage)
router.post("/register",authController.registerReceiver)
router.get("/",authController.showLoginPage)
router.post("/login",authController.receiverLogin)

module.exports = router;
