const Tailor = require('../models/Tailor')

module.exports = {
    // Getting All Tailor From Database
    viewAllTailors(req, res) {
        // Method from Youtube
        Tailor.find({})
            .exec(function (err, tailors) {
                if (err) {
                    res.send('error occured')
                } else {
                    console.log(tailors);
                    res.render('TailorsList', {
                        tailors
                    })
                }
            });
    },
    viewNewTailors(req, res) {
        res.render('newTailor',{Tailor})
    },
    newTailor(req, res) {
        Tailor.create(req.body)
        res.redirect('/tailors')    
        
    },
//    viewATailor(req, res) {
//        IDTailor = req.params.id
//        Tailor.findByID(IDTailor)
//    },

}

