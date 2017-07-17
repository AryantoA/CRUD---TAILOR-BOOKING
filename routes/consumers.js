const express = require('express')
const router = express.Router()

const ConsumerController = require('../controller/consumers_controller')

//////////////Authentication///////////////////////////
const User = require('../models/Consumer')

const passportService = require('../services/passportConsumer')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })
//////////////////////End of Authentication/////////////////
//consumers
router.get('/',ConsumerController.viewAllConsumers)
router.get('/signup',ConsumerController.viewNewConsumer)
router.get('/:idConsumer',ConsumerController.viewAConsumer)
router.get('/update/:idConsumer',ConsumerController.viewUpdateAConsumer)
router.get('/delete/:idConsumer',ConsumerController.viewDeleteAConsumer)
router.get('/booking/:idConsumer',ConsumerController.viewAllTailors)
router.get('/booking/:idConsumer/:id',ConsumerController.viewSelectedTailor)
/////////////Authentication ////////////
router.get('/signin',ConsumerController.viewSignInTailor)
           
router.post('/signin', requireSignin, ConsumerController.signin)

router.post('/signout', ConsumerController.signout)
router.post('/signup', ConsumerController.signup)
//////////// end of authentication//////////////
//
router.post('/add',ConsumerController.newConsumer)
router.post('/update/:idConsumer',ConsumerController.updateAConsumer)
router.post('/delete/:idConsumer',ConsumerController.deleteAConsumer)


module.exports = router