const Booking = require('../models/Booking')

module.exports = {
    viewAllBooking(req,res){
        Booking.find({},function(err,booking){
            if(err){
                console.log(err)
            } else{
                res.render('booking',{booking})
            }
        })
    },
    viewNewBooking(req, res){
        res.render('newBooking',{Booking})

    },
    newBooking(req, res){
        var booking = new Booking(req.body);
            booking.save(function(err,createdBookingObject){
            if(err){
                console.log(err)
            }else{
                console.log(createdBookingObjectObject)
                res.redirect('/')
            }
        })
    }
}