const router = require('express').Router()
const publicController = require('../controller/PublicController/publicController')


//To view all the blood results
router.get('/viewAllBloodSamples',publicController.viewAllBloodSamples) 
// To view all the hospitals
router.get('/viewAllHospitals',publicController.viewAllHospitals) 
// To view the list of blood samples available in that hospital
router.get('/viewBloodListOfHospital',publicController.viewBloodListOfHospital) 
// To check blood samples in hospial according to blood group
router.get('/viewBloodGroupInHospitals', publicController.viewBloodGroupInHospital)

module.exports = router