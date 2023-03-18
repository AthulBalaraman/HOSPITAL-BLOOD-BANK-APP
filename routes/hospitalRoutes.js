const router = require("express").Router();
const authcontroller = require('../controller/HospitalController/authController')
const samplesController = require('../controller/HospitalController/samplesController')

// ----------------------- AUTHENTICATION ROUTES ---------------------------------------
// router.get("/register",authcontroller.showRegisterPage )
// router.get("/",authcontroller.showLoginPage)
router.post("/register",authcontroller.registerHospital)
router.post("/login",authcontroller.hospitalLogin)

// CRUD BLOOD SAMPLES
router.post('/addBloodSample',samplesController.addSample)
router.put('/editBloodSample',samplesController.editSample)
router.delete('/deleteBloodSample',samplesController.deleteSample)





module.exports = router;
