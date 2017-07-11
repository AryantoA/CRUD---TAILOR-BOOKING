var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TailorSchema = new Schema({
    name : {
        type : String,
        required :true,    
    },
     address : {
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
        },
    priceRange : {
        type : Number,
        },
    location : {
        type : String,
    },
    reserved: [
        {
            from: String,
            to : String
        }
    ]
})
//    },
//    //Embedded sub-document for reviews and etc
//    // the infomation can be display using data.detail.suitPrice
//    detail : {
//        shirtPrice : Number,
//        suitPrice : Number,
/// From documentation it says it will change the Uppercase to lowercase to prevent it unable to search
    //{ runSettersOnQuery: true }


module.exports = mongoose.model('Tailor',TailorSchema)