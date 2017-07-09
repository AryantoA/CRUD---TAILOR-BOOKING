const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')


router.get('/',TailorController.viewAllTailors)
router.get('/add',TailorController.viewNewTailor)
router.get('/:idTailor',TailorController.viewATailor)
router.get('/update/:idTailor',TailorController.viewUpdateATailor)
router.get('/delete/:idTailor',TailorController.viewDeleteATailor)


router.post('/add',TailorController.newTailor)
router.post('/update/:idTailor',TailorController.updateATailor)
router.post('/delete/:idTailor',TailorController.deleteATailor)
router.post('/bookings',TailorController.filterTailors)
module.exports = router