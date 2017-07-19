var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

var TailorSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
    },
    priceRange: {
        type: Number,
    },
    location: {
        type: String,
    },
    consumersBooking: [{
        type: Schema.Types.ObjectId,
        ref: 'Consumer'
    }]
})
//    },
//    //Embedded sub-document for reviews and etc
//    // the infomation can be display using data.detail.suitPrice
//    detail : {
//        shirtPrice : Number,
//        suitPrice : Number,
/// From documentation it says it will change the Uppercase to lowercase to prevent it unable to search
//{ runSettersOnQuery: true }

////////////////////authentication////////////////////////////////
TailorSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

TailorSchema.methods.comparePassword = function (TailorPassword, callback) {

    bcrypt.compare(TailorPassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
}
////////////////////end of authentication////////////////////////////////
module.exports = mongoose.model('Tailor', TailorSchema)