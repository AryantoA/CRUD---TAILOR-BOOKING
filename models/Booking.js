var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    dateOfBooking: {
        type: String
    },
    timeOfBooking: {
        type: String
    },
    consumerId: {
        type: Schema.Types.ObjectId,
        ref: 'Tailor'
    },
    tailorId: {
        type: Schema.Types.ObjectId,
        ref: 'Consumer'
    }
})


module.exports = mongoose.model('Booking',BookingSchema)