const Tailor = require('../models/Tailor')

module.exports = {
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
    viewNewTailor(req, res) {
        res.render('newTailor', {
            Tailor
        })
    },
    newTailor(req, res) {
        Tailor.create(req.body)
        res.redirect('/tailors')

    },
    viewATailor(req, res) {
        var IDTailor = req.params.id
        Tailor.findById(IDTailor, function (err, tailor) {
            if (err) {
                console.log(err)
            } else {
                res.render('ATailor', {
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
                res.render('updateTailor', {
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
                res.render('deleteTailor', {
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
    
    findingTheTailors(req,res){
        Tailor.find({
            location : req.body.location 
        },function(err,tailor){
            if(err){
                console.log(err)
            }else{
//                this.searched = tailor
//                console.log(tailor)
//                console.log("i am on POST=====" + this.searched)
                res.render('searchResult',{tailor : tailor})
                
                /// this printing the right name
//                console.log(tailor[0].name)
                res.redirect('/tailors/result')
            }
        })
    }
    
}
    