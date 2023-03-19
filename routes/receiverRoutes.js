const router = require("express").Router();
const authController = require('../controller/ReceiverController/authController')
const requestController  = require('../controller/ReceiverController/requestController')

router.get("/register",authController.showRegisterPage)
router.post("/register",authController.registerReceiver)
router.get("/",authController.showLoginPage)
router.post("/login",authController.receiverLogin)


router.post('/requestBloodSample',requestController.addRequest)
module.exports = router;
