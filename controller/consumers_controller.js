const Consumer = require('../models/Consumer')

module.exports = {
    viewAllConsumers(req,res){
        Consumer.find({},function(err,consumers){
            if(err){
                console.log(err)
            } else{
                res.render('ConsumersList',{consumers})
            }
        })
    },
    viewNewConsumer(req,res){
        res.render('newConsumer',{Consumer})
    },
    viewAConsumer(req,res){
        var IDConsumer = req.params.id
        Consumer.findById(IDConsumer, function(err,consumer){
            if (err){
                console.log(err)
            }
            if (consumer){
                res.render('AConsumer',{consumer})
            }else {
                res.render("No User found with that ID")
            }
        })
        
    },
    viewUpdateAConsumer(req,res){
        var IDConsumer = req.params.id
        Consumer.findById(IDConsumer, function(err,consumer){
            if (err){
                console.log(err)
            }
            if (consumer){
                res.render('updateConsumer',{consumer})
            }else {
                res.render("No User found with that ID")
            }
        })
        
    },
    viewDeleteAConsumer(req,res){
        var IDConsumer = req.params.id
        Consumer.findById(IDConsumer, function(err,consumer){
            if (err){
                console.log(err)
            }
            if (consumer){
                res.render('deleteConsumer',{consumer})
            }else {
                res.render("No User found with that ID")
            }
        })
    },
    newConsumer(req,res){
    var consumer = new Consumer(req.body);
        consumer.save(function(err,createdConsumerObject){
            if(err){
                console.log(err)
            }else{
                console.log(createdConsumerObject)
                res.redirect('/Consumers/')
            }
        })
    },
    updateAConsumer(req,res){
        var IDConsumer =req.params.id
        Consumer.findByIdAndUpdate(IDConsumer,{
            "name": req.body.name,
            "location" : req.body.location,
            "email" : req.body.email,
            "contactNumber" : req.body.contactNumber}
        ,function(err,updateInfo){
            if (err){
                console.log(err)
            } else{
                console.log(updateInfo)
                res.redirect('/Consumers/'+IDConsumer)
            }
        })
    },
    deleteAConsumer(req,res){
        var IDConsumer = req.params.id
        Consumer.findByIdAndRemove(IDConsumer,function(err){
            if (err){
                console.log(err)
            }else{
                res.redirect('/Consumers/')
            }
        })
    }
}