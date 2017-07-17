const express = require('express')
const router = express.Router()

const ConsumerController = require('../controller/consumers_controller')


//consumers
router.get('/',ConsumerController.viewAllConsumers)
router.get('/add',ConsumerController.viewNewConsumer)
router.get('/:idConsumer',ConsumerController.viewAConsumer)
router.get('/update/:idConsumer',ConsumerController.viewUpdateAConsumer)
router.get('/delete/:idConsumer',ConsumerController.viewDeleteAConsumer)
router.get('/booking/:idConsumer',ConsumerController.viewAllTailors)
router.get('/booking/:idConsumer/:id',ConsumerController.viewSelectedTailor)


//
router.post('/add',ConsumerController.newConsumer)
router.post('/update/:idConsumer',ConsumerController.updateAConsumer)
router.post('/delete/:idConsumer',ConsumerController.deleteAConsumer)


module.exports = router