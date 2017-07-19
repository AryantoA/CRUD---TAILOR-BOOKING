const Tailor = require('../models/Tailor')
const Consumer = require('../models/Consumer')
const jwt = require('jwt-simple')
const secret = require('../config/secret')

tokenForTailor = (user) => {
    return jwt.encode({
        sub: user.id
    }, secret)
}
module.exports = {
    ////////////////////AUTHENTICATION////////////////////////////////////////////////////
    signup(req, res, next) {

        const email = req.body.email
        const password = req.body.password
//        const name = req.body.name
//        const address = req.body.address
//        const contactNumber = req.body.contactNumber
//        const priceRange = req.body.priceRange
//        const location = req.body.location
//        
        

        //Send a custom error message when the email and password isn't given !name ||!address ||!contactNumber ||!priceRange ||!location ||
        if (!email || !password) {
            return res.status(422).send({
                error: 'You must provide an email and password'
            })
        }
        // See if a user with given email exists
        Tailor.findOne({
            email
        }, (error, existingTailor) => {
            if (error) {
                return next(error)
            }

            // If user with email exists, return error
            if (existingTailor) {
                // 422 unproccesable entity
                return res.status(422).send({
                    error: 'Email is already in use'
                })
            }

            // If user does not exist, create and save user
            const tailor = new Tailor({
                email: email,
                password: password,
//                name: name,
//                address: address,
//                contactNumber: contactNumber,
//                priceRange: priceRange,
//                location: location,
            });

            tailor.save(function (err) {
                if (err) {
                    return next(err);
                }
                // Repond to request indicating the user was created
                res.send('user succesfully added ' + tailor)
            });
        })
    },
    signin(req, res, next) {
        // User has already had their email and password auth'd
        // We need to give them a token
        res.cookie('jwt', tokenForTailor(req.user), {
            maxAge: 3600000 * 24,
            httpOnly: false
        })
        //    res.send('cookie added, see if it works, after this go to the home route')
        res.redirect('/tailors/')
    },
    signout(req, res, next) {
        // There is no way to delete a cookie from the client side. We simply set the cookie to be empty
        res.cookie('jwt', '', {
            maxAge: 3600000 * 24,
            httpOnly: false
        })
        alert('you have successfully log out')
        res.redirect('/')
    },
    ////////////////////////////////END OF AUTHENTICATION////////////////////////////////////////////////////
    // Getting All Tailor From Database
    viewAllTailors(req, res) {
        Tailor.find({}, function (err, tailors) {
            if (err) {
                console.log(err)
            } else {
                res.render('homepage', {
                    tailors
                })
            }
        })
    },
    viewLandingLogin(req, res) {
        res.render('tailor/loginLanding', {
            Tailor
        })
    },
    viewNewTailor(req, res) {
        res.render('tailor/newTailor', {
            Tailor
        })
    },
    //    newTailor(req, res) {
    //        Tailor.create(req.body)
    //        res.redirect('/tailors')
    //
    //    },
    viewATailor(req, res) {
        var IDTailor = req.params.id
        Tailor.findById(IDTailor, function (err, tailor) {
            if (err) {
                console.log(err)
            } else {
                res.render('tailor/ATailor', {
                    tailor
                })
            }
        })
    },
    viewUpdateATailor(req, res) {
        var IDTailor = req.params.id
        Tailor.findById(IDTailor, function (err, tailor) {
            if (err) {
                console.log(err)
            } else {
                res.render('tailor/updateTailor', {
                    tailor
                })
            }
        })
    },
    updateATailor(req, res) {
        var IDTailor = req.params.id
        Tailor.findOneAndUpdate(IDTailor, {
                "name": req.body.name,
                "email": req.body.email
            },
            function (err) {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/tailors")
                }
            })

    },
    viewDeleteATailor(req, res) {
        var IDTailor = req.params.id
        Tailor.findById(IDTailor, function (err, tailor) {
            if (err) {
                console.log(err)
            } else {
                res.render('tailor/deleteTailor', {
                    tailor
                })
            }
        })
    },
    deleteATailor(req, res) {
        var IDTailor = req.params.id
        Tailor.findByIdAndRemove(IDTailor, function (err) {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/tailors')
            }
        })
    },

    //    viewFindingTheTailors(req,res){
    //        
    //        res.render('searchResult',{tailor : tailor})
    //    },

    findingTheTailors(req, res) {
        Tailor.find({
            location: req.body.location
        }, function (err, tailor) {
            if (err) {
                console.log(err)
            } else {
                //                this.searched = tailor
                //                console.log(tailor)
                //                console.log("i am on POST=====" + this.searched)
                res.render('tailor/searchResult', {
                    tailor: tailor
                })

                /// this printing the right name
                //                console.log(tailor[0].name)
                res.redirect('/tailors/result')
            }
        })

        // Tailor.find({}).populate('commentsTailor').exec((error,tailor) => {
        //            if (error) console.log(error)
        //            res.send(tailor)
        //        })
    },


    viewBookingATailor(req, res) {
        var IDTailor = req.params.id
        res.render("tailor/newBooking", {
            Tailor
        })
    },
    viewSignInTailor(req, res) {
        res.render('tailor/signin')
    },
    ///// adding populate ////////////////    


    //////////////end of populate            


    //////////////////TEMPORARY BLOCK THIS DUE TO SETTING UP AUTHENTICATION ////////////////////////////////
    //    BookingATailor(req,res){
    //        var IDTailor = req.params.idTailor
    //        Tailor.save(function(err){
    //            if (err){
    //                console.log(err)
    //            }else{
    //                res
    //            }
    //        })
    //    }

}