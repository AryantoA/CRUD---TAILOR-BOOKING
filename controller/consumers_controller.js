const Consumer = require('../models/Consumer')
const Tailor = require('../models/Tailor')
const jwt = require('jwt-simple')
const secret = require('../config/secret')

tokenForConsumer = (user) => {
  return jwt.encode({ sub: user.id }, secret)
}
module.exports = {
    ///////////////////AUTHENTICATION////////////////////////////////////////////////////
    signup(req, res, next) {

    const email = req.body.email
    const password = req.body.password

    //Send a custom error message when the email and password isn't given
    if (!email || !password) {
      return res.status(422).send({error: 'You must provide an email and password'})
    }
    // See if a user with given email exists
    Consumer.findOne({ email }, (error, existingConsumer) => {
      if (error) { return next(error)}

      // If user with email exists, return error
      if (existingConsumer) {
        // 422 unproccesable entity
        return res.status(422).send({ error: 'Email is already in use'})
      }

      // If user does not exist, create and save user
      const consumer = new Consumer({
        email: email,
        password: password
      });

      consumer.save(function(err) {
        if (err) { return next(err); }
        // Repond to request indicating the user was created
        res.send('user succesfully added ' + consumer)
      });
    })
  },
  signin(req, res, next) {
    // User has already had their email and password auth'd
    // We need to give them a token
    res.cookie('jwt', tokenForTailor(req.user), {maxAge: 3600000 * 24, httpOnly: false})
//    res.send('cookie added, see if it works, after this go to the home route')
      res.redirect('/consumer/loginLanding')
  },
  signout(req, res, next) {
    // There is no way to delete a cookie from the client side. We simply set the cookie to be empty
    res.cookie('jwt', '', {maxAge: 3600000 * 24, httpOnly: false})
      alert('you have successfully log out')
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
    viewNewConsumer(req, res) {
        res.render('consumer/newConsumer', {
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
                res.redirect('/Consumers')
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
                res.redirect('/Consumers/' + IDConsumer)
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
    viewAllTailors(req, res) {
        var IDConsumer = req.params.idConsumer

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
    viewSelectedTailor(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        Consumer.findById(IDConsumer, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                foundUser.tailorsBooking.push(IDTailor);
                foundUser.save(function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(data)
                    }
                })
            }
        })
        Tailor.findById(IDTailor, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                foundUser.consumersBooking.push(IDConsumer);
                foundUser.save(function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(data)
                    }
                })
            }
        })
        Consumer.findById(IDConsumer).populate('Tailor').exec( (error, tailors) => {
      if (error) console.log(error)
      res.render('consumer/selectedTailor',{Tailor: tailors})
    })
    },
    viewSignInConsumer(req,res){
        res.render('consumer/signin')
    }
    
}