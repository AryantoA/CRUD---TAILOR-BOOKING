const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')

router.get('/',TailorController.viewAllTailors)
router.get('/add',TailorController.viewNewTailors)
router.get('/:id',TailorController.viewATailor)
router.get('/update/:id',TailorController.viewUpdateATailor)
router.get('/delete/:id',TailorController.viewDeleteATailor)


router.post('/add',TailorController.newTailor)
router.post('/update/:id',TailorController.updateATailor)
router.post('/delete/:id',TailorController.deleteATailor)
module.exports = router