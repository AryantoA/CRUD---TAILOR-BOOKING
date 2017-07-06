const express = require('express')
const router = express.Router()

const ConsumerController = require('../controller/consumers_controller')


//consumers
router.get('/',ConsumerController.viewAllConsumers)
router.get('/add',ConsumerController.viewNewConsumer)
router.get('/:id',ConsumerController.viewAConsumer)
router.get('/update/:id',ConsumerController.viewUpdateAConsumer)
//router.get('/delete/:id',ConsumerController.viewDeleteAConsumer)
//
router.post('/add',ConsumerController.newConsumer)
router.post('/update/:id',ConsumerController.updateAConsumer)
//router.post('/delete/:id',ConsumerController.deleteAConsumer)
module.exports = router