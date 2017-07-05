const express = require('express')
const router = express.Router()
const TailorController = require('../controller/tailors_controller')

router.get('/',TailorController.viewAllTailors)
router.get('/add',TailorController.viewNewTailors)
router.get('/:id',TailorController.viewATailor)


router.post('/add',TailorController.newTailor)
module.exports = router