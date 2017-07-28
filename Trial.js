viewSelectedTailor(req, res) {
        var IDConsumer = req.params.idConsumer
        var IDTailor = req.params.id
        var Date = req.body.data
        var Time = req.body.time
        Consumer.findById(IDConsumer, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                foundUser.tailorsBooking.push(IDTailor,Date,Time);
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