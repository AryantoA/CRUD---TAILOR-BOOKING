const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')

//Authentication
const User = require('../models/Tailor')
const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })
//End of Authentication

router.get('/',TailorController.viewAllTailors)
router.get('/add',TailorController.viewNewTailor)
router.get('/:id',TailorController.viewATailor)
router.get('/update/:id',TailorController.viewUpdateATailor)
router.get('/delete/:id',TailorController.viewDeleteATailor)
//router.get('/result',TailorController.viewFindingTheTailors)
router.get('/booking/:id',TailorController.viewBookingATailor)



router.post('/add',TailorController.newTailor)
router.post('/update/:id',TailorController.updateATailor)
router.post('/delete/:id',TailorController.deleteATailor)
router.post('/result',TailorController.findingTheTailors)
//router.post('/:id/reserve',TailorController.reservingTheTailor)

module.exports = router