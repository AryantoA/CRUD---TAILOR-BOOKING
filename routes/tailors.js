const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')


router.get('/',TailorController.viewAllTailors)
router.get('/add',TailorController.viewNewTailor)
router.get('/:id',TailorController.viewATailor)
router.get('/update/:id',TailorController.viewUpdateATailor)
router.get('/delete/:id',TailorController.viewDeleteATailor)
//router.get('/result',TailorController.viewFindingTheTailors)



router.post('/add',TailorController.newTailor)
router.post('/update/:id',TailorController.updateATailor)
router.post('/delete/:id',TailorController.deleteATailor)
router.post('/result',TailorController.findingTheTailors)
//router.post('/:id/reserve',TailorController.reservingTheTailor)
module.exports = router