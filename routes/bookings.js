const express = require('express')
const router = express.Router()
const BookingController = require('../controller/bookings_controller')

router.get('/',BookingController.viewAllBooking)
router.get('/add',BookingController.viewNewBooking)

router.post('/add',BookingController.newBooking)


module.exports = router