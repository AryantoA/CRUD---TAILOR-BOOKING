var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    IDConsumer :{
        type : String,
        required:true,   
    },
    IDTailor:{
        type : String,
        required:true,   
    },
    date:{
        type : String,
        required:true,   
    },
    comments:{
        type : String,
        required:true,   
    }
})
module.exports = mongoose.model('Booking',BookingSchema)