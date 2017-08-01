const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')

//////////////Authentication///////////////////////////
const User = require('../models/Tailor')

const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwtTailor', { session: false })
const requireSignin = passport.authenticate('localTailor', { session: false })
//////////////////////End of Authentication/////////////////

router.get('/',TailorController.viewAllTailors)
router.get('/signup',TailorController.viewNewTailor)
router.get('/signin',TailorController.viewSignInTailor)
           



router.get('/update/:id',requireAuth,TailorController.viewUpdateATailor)
router.get('/delete/:id',requireAuth,TailorController.viewDeleteATailor)
router.get('/login/:idTailor',requireAuth,TailorController.viewATailor)
router.get('/booking/:idTailor',requireAuth,TailorController.viewBooking) 

//router.get('/result',TailorController.viewFindingTheTailors)

/////////////Populated///////////




////////end of populate ///////////

router.post('/signin',requireSignin,TailorController.signin)
//router.post('/booking/:idTailor',TailorController.Booking) 
router.post('/signout', TailorController.signout)
router.post('/signup', TailorController.signup)
router.post('/update/:id',TailorController.updateATailor)
router.post('/delete/:id',TailorController.deleteATailor)
router.post('/result',TailorController.findingTheTailors)

//router.post('/:id/reserve',TailorController.reservingTheTailor)

module.exports = router