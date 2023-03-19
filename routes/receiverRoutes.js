const router = require("express").Router();
const authController = require("../controller/ReceiverController/authController");
const requestController = require("../controller/ReceiverController/requestController");

// ----------------------- AUTHENTICATION ROUTES
router.post("/register", authController.registerReceiver);
router.post("/login", authController.receiverLogin);


// -------------- ROUTER TO ADD BLOOD REQUEST --------------------------------
router.post("/requestBloodSample",receiverSessionChecker, requestController.addRequest);
module.exports = router;
