const router = require("express").Router();
const authcontroller = require('../controller/HospitalController/authController')

// ----------------------- AUTHENTICATION ROUTES ---------------------------------------
router.get("/register",authcontroller.showRegisterPage )
router.post("/register",authcontroller.registerHospital)
router.get("/",authcontroller.showLoginPage)
router.post("/login",authcontroller.hospitalLogin)



module.exports = router;
