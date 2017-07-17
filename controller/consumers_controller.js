const Consumer = require('../models/Consumer')
const Tailor = require('../models/Tailor')

module.exports = {
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
                    tailors, consumer : IDConsumer
                })
            }
        })
    },
    viewSelectedTailor(req, res) {
//        var IDConsumer = req.params.idConsumer
//        var IDTailor = req.params.id
//        
//        var Tailor = new Tailor({name:'Foo'})
//        Tailor.save(function(err){
//            Consumer.tailorsBooking.push(Tailor);
//            Consumer.save(function(err){
//                console.log(err)
//            })
//        })
         
//        Tailor.create({tailorsBooking : req.params.id },(error,tailor) => {
//            if(error){
//                console.log(error)
//            }else{
//                Consumer.findByIdAndUpdate(req.params.id,{$push :{consumersBooking : tailor._id}},(error,updatedBooking) => {
//                    if(error) console.log(error)
//                    res.render('allTailors',{updatedBooking})
//                })
//            }
//        })
        
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        Tailor.findById(IDTailor, function (err, tailor) {
            if (err) {
                console.log(err)
            } else {
                res.render('consumer/selectedTailor', {
                    tailor
                })
            }
        })
    }
}