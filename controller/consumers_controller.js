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
        
//    },
//    viewUpdateAConsumer(req,res){
//    },
//    viewDeleteAConsumer(req,res){
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
//    },
//    updateAConsumer(req,res){
//    },
//    deleteAConsumer(req,res){
    }
}