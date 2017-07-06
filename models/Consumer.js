var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsumerSchema = new Schema({
    name : {
        type : String,
        required :true,    
    },
     location : {
        type : String,
        required :true,    
    },
     email : {
        type : String,
        required :true,
        unique: true
    },
    contactNumber : {
        type : Number,
        unique :true
//    },
//    //Embedded sub-document for reviews and etc
//    // the infomation can be display using data.detail.suitPrice
//    detail : {
//        shirtPrice : Number,
//        suitPrice : Number,
    }
/// From documentation it says it will change the Uppercase to lowercase to prevent it unable to search
    //{ runSettersOnQuery: true }
})

module.exports = mongoose.model('Consumer',ConsumerSchema)