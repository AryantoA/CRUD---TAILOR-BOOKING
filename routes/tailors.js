const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')

//////////////Authentication///////////////////////////
const User = require('../models/Tailor')

const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })
//////////////////////End of Authentication/////////////////

router.get('/',TailorController.viewAllTailors)
router.get('/signup',TailorController.viewNewTailor)
router.get('/:id',TailorController.viewATailor)
router.get('/update/:id',TailorController.viewUpdateATailor)
router.get('/delete/:id',TailorController.viewDeleteATailor)
//router.get('/result',TailorController.viewFindingTheTailors)

/////////////Populated///////////




////////end of populate ///////////

router.get('/signin',TailorController.viewSignInTailor)
           
router.post('/signin', requireSignin, TailorController.signin)

router.post('/signout', TailorController.signout)
router.post('/signup', TailorController.signup)
router.post('/update/:id',TailorController.updateATailor)
router.post('/delete/:id',TailorController.deleteATailor)
router.post('/result',TailorController.findingTheTailors)
//router.post('/:id/reserve',TailorController.reservingTheTailor)

module.exports = router