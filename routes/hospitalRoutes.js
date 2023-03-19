const router = require("express").Router();
const authcontroller = require('../controller/HospitalController/authController')
const samplesController = require('../controller/HospitalController/samplesController')
const requestController = require('../controller/HospitalController/requestController')

// ----------------------- AUTHENTICATION ROUTES ---------------------------------------

router.post("/register",authcontroller.registerHospital)
router.post("/login",authcontroller.hospitalLogin)

//----------------------------- CRUD BLOOD SAMPLES ROUTES ----------------------------
router.post('/addBloodSample',samplesController.addSample)
router.put('/editBloodSample',samplesController.editSample)
router.delete('/deleteBloodSample',samplesController.deleteSample)
router.get('/viewAllBloodSamples',samplesController.showBloodList)

//----------------------------- REQUSET ROUTES ------------------------------------
router.get('/viewAllRequests',requestController.viewAllRequests)
router.get('/viewParticularBloodGroupRequests',requestController.viewParticularBloodGroupRequests)
router.put('/updateRequestStatus',requestController.updateRequestStatus)




module.exports = router;
