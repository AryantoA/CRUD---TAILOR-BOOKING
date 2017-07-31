const Consumer = require('../models/Consumer')
const Tailor = require('../models/Tailor')
const Booking = require('../models/Booking')
const jwt = require('jwt-simple')
const secret = require('../config/secret')

tokenForConsumer = (user) => {
    return jwt.encode({
        sub: user.id
    }, secret)
}
module.exports = {
    ///////////////////AUTHENTICATION////////////////////////////////////////////////////
    signup(req, res, next) {

        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const location = req.body.location
        const contactNumber = req.body.contactNumber



        //Send a custom error message when the email and password isn't given
        if (!email || !password) {
            return res.status(422).send({
                error: 'You must provide an email and password'
            })
        }
        // See if a user with given email exists
        Consumer.findOne({
            email
        }, (error, existingConsumer) => {
            if (error) {
                console.log("AqqqqqqqqqGG")
                return next(error)
            }

            // If user with email exists, return error
            if (existingConsumer) {
                // 422 unproccesable entity
                return res.status(422).send({
                    error: 'Email is already in use'
                })
            }

            // If user does not exist, create and save user
            const consumer = new Consumer({
                name: name,
                location: location,
                email: email,
                contactNumber: contactNumber,
                password: password
            });

            consumer.save(function (err) {
                if (err) {
                    console.log(err)
                    console.log("ARGGGGGGGGGGG")
                    return next(err);
                } else {
                    console.log("Aaaaaaaaaaaaaaaaaaaaaa")
                    // Repond to request indicating the user was created
                    res.redirect('/consumers/success')
                    //res.render('consumer/successfullyCreateAccount',{consumer})
                    //res.send('user succesfully added ' + consumer)
                }
            });
        })
    },
    signin(req, res, next) {
        // User has already had their email and password auth'd
        // We need to give them a token
        /// need to change the name to tokenForConsumer 19/7/2017
        console.log("======================")
        console.log(req.user)
        console.log("======================")
        res.cookie('jwt', tokenForConsumer(req.user), {
            maxAge: 3600000 * 24,
            httpOnly: false
        })
        //            res.send('cookie added, see if it works, after this go to the home route')
        var IDConsumer = req.user._id
        res.redirect('/consumers/checkin/' + IDConsumer)
    },
    signout(req, res, next) {
        // There is no way to delete a cookie from the client side. We simply set the cookie to be empty
        res.cookie('jwt', '', {
            maxAge: 3600000 * 24,
            httpOnly: false
        })
        res.redirect('/')
    },
    ////////////////////////////////END OF AUTHENTICATION////////////////////////////////////////////////////
    viewAllConsumers(req, res) {
        Consumer.find({}, function (err, consumers) {
            if (err) {
                console.log(err)
            } else {
                res.render('consumer/ConsumersList', {
                    consumers
                })
            }
        })
    },
    viewSignUp(req, res) {
        res.render('consumer/signup', {
            Consumer
        })
    },
    viewAConsumer(req, res) {
        var IDConsumer = req.params.idConsumer
        Consumer.findById(IDConsumer, function (err, consumer) {
            if (err) {
                console.log(err)
            }
            if (consumer) {
                res.render('consumer/AConsumer', {
                    consumer
                })
            } else {
                res.send("No User found with that ID")
            }
        })

    },
    viewUpdateAConsumer(req, res) {
        var IDConsumer = req.params.idConsumer
        Consumer.findById(IDConsumer, function (err, consumer) {
            if (err) {
                console.log(err)
            }
            if (consumer) {
                res.render('consumer/updateConsumer', {
                    consumer
                })
            } else {
                res.render("No User found with that ID")
            }
        })

    },
    viewDeleteAConsumer(req, res) {
        var IDConsumer = req.params.idConsumer
        Consumer.findById(IDConsumer, function (err, consumer) {
            if (err) {
                console.log(err)
            }
            if (consumer) {
                res.render('consumer/deleteConsumer', {
                    consumer
                })
            } else {
                res.render("No User found with that ID")
            }
        })
    },

    newConsumer(req, res) {
        var consumer = new Consumer(req.body);
        consumer.save(function (err, createdConsumerObject) {
            if (err) {
                console.log(err)
            } else {
                console.log(createdConsumerObject)
                res.redirect('/Consumers/sign')
            }
        })
    },
    updateAConsumer(req, res) {
        var IDConsumer = req.params.idConsumer
        Consumer.findByIdAndUpdate(IDConsumer, {
            "name": req.body.name,
            "location": req.body.location,
            "email": req.body.email,
            "contactNumber": req.body.contactNumber
        }, function (err, updateInfo) {
            if (err) {
                console.log(err)
            } else {
                console.log(updateInfo)
                res.redirect('/Consumers/checkin/' + IDConsumer)
            }
        })
    },
    deleteAConsumer(req, res) {
        var IDConsumer = req.params.idConsumer
        Consumer.findByIdAndRemove(IDConsumer, function (err) {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/Consumers')
            }
        })
    },
    viewStep1Booking(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        var Date = req.body.date
        var Time = req.body.time

        /////////////////WORKING ON THIS 27/7/17//// adding the booking feature
        //        Tailor.findById(IDTailor,function(err,Tailor){
        //            if (err){
        //                console.log(err)
        //            }else{
        //            
        //                    
        //                }
        //            }
        //        })

        Tailor.find({}, function (err, tailors) {
            if (err) {
                console.log(err)
            } else {
                res.render('consumer/allTailors', {
                    tailors,
                    consumer: IDConsumer
                })
            }
        })
    },
    /////////////////WORKING ON THIS 27/7/17
    viewStep2Booking(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        res.render('consumer/bookingAnAppointment', {
            IDConsumer,
            IDTailor
        })
    },
    step2Booking(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        var Date = req.body.date
        var Time = req.body.time
        console.log(Date)
        console.log(typeof (Date))

        //        var TailorObject = new TailorObject({
        //            "bookedBy": IDConsumer,
        //            "dateOfBooking": Date,
        //            "timeOfBooking": Time
        //        })
        var CustomerObject = {
            "dateOfBooking": Date,
            "timeOfBooking": Time,
            "consumerId": IDConsumer,
            "tailorId": IDTailor
        }

        //var CustomerObject = [IDTailor,Date,Time]

        Consumer.findById(IDConsumer, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                foundUser.tailorsBooking.push(CustomerObject);
                foundUser.save(function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        Tailor.findByIdAndUpdate(IDTailor, {
                            $push: {
                                consumersBooking: IDConsumer
                            }
                        }, function (err, data) {
                            if (err) {
                                console.log(err)
                            } else {
                                Consumer.findById(IDConsumer).populate('Tailor').exec((error, tailors) => {
                                    if (error) console.log(error)
                                    res.render('consumer/selectedTailor', {
                                        tailors: tailors
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    },
  

    ///// CRUD FOR BOOKING /// 31-07-2017
    viewConsumerCreateABooking(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        res.render('consumer/bookingAnAppointment', {
            IDConsumer,
            IDTailor
        })
    },
    consumerCreateABooking(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        var Date = req.body.date
        var Time = req.body.time
        var CustomerObject = {
            "dateOfBooking": Date,
            "timeOfBooking": Time,
            "consumerId": IDConsumer,
            "tailorId": IDTailor
        }
        var booking = new Booking(CustomerObject);
        booking.save(function (err, createBookingObject) {
                if (err) {
                    res.send(err)
                } else {
                    Consumer.findById(IDConsumer, function (err, foundUser) {
                        if (err) {
                            console.log(err)
                        } else {
                            foundUser.tailorsBooking.push(createBookingObject);
                            foundUser.save(function (err, data) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    Tailor.findByIdAndUpdate(IDTailor, {
                                        $push: {
                                            consumersBooking: createBookingObject
                                        }
                                    }, function (err, data) {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            Consumer.findById(IDConsumer).populate('Tailor').exec((error, tailors) => {
                                                if (error) console.log(error)
                                                res.render('consumer/selectedTailor', {
                                                    tailors: tailors
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
        })},
    viewConsumerUpdateABooking(req,res){
        var IDConsumer = req.params.idConsumer
        var IDBooking = req.params.idBooking
        Booking.findById(IDBooking, function (err, booking) {
            if (err) {
                console.log(err)
            }
            if (booking) {
                res.render('booking/updateBooking', {
                    booking,IDConsumer
                })
            } else {
                res.render("No Booking found with that ID")
            }
        })

    },
    
    consumerUpdateABooking(req,res){
        var IDConsumer = req.params.idConsumer
        var IDBooking = req.params.idBooking
        Booking.findByIdAndUpdate(IDBooking, {
           "dateOfBooking": req.body.date,
            "timeOfBooking": req.body.time
        }, function (err, updateBooking) {
            if (err) {
                console.log(err)
            } else {
                console.log(updateBooking)
                res.redirect('/Consumers')
            }
        })},
    
    viewConsumerAllBooking(req,res){
        var IDConsumer = req.params.idConsumer
        Booking.find({consumerId: IDConsumer}, function (err, consumerBooking) {
            if (err) {
                console.log(err)
            }
            if (consumerBooking) {
//                res.send(consumerBooking)
                res.render('booking/AllConsumerBooking', {
                    consumerBooking:consumerBooking
                })
            } else {
                res.send("No User found with that ID")
            }
        })

    },
    deleteABooking(req,res){
        var IDBooking = req.params.idBooking
        var IDConsumer = req.params.idConsumer
        Booking.findByIdAndRemove(IDBooking, function (err) {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/Consumers/booking/'+IDConsumer)
            }
        })
    },
    viewDeleteABooking(req,res){
        var IDBooking = req.params.idBooking
        Booking.findById(IDBooking, function (err, booking) {
            if (err) {
                console.log(err)
            }
            if (booking) {
                res.render('booking/deleteABooking', {
                    Booking : booking
                })
            } else {
                res.render("No Booking found with that ID")
            }
        })
    },
    viewSuccessCreateAccount(req, res) {
        res.render('consumer/successfullyCreateAccount')
    },
    viewMakingBookingDate(req, res) {
        res.render('consumer/bookingadate')
    },
    viewSignInConsumer(req, res) {
        res.render('consumer/signin')
    }

}