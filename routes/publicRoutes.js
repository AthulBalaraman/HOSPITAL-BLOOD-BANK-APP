const router = require('express').Router()
const publicController = require('../controller/PublicController/publicController')
router.get('/viewAllBloodSamples',publicController.viewAllBloodSamples)
router.get('/viewAllHospitals',publicController.viewAllHospitals)
router.get('/viewBloodListOfHospital',publicController.viewBloodListOfHospital)
router.get('/viewBloodGroupInHospitals', publicController.viewBloodGroupInHospital)

module.exports = router