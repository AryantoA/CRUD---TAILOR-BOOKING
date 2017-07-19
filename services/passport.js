const passport = require('passport')
const Tailor = require('../models/Tailor')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret = require('../config/secret')
const LocalStrategy = require('passport-local')
// local stategy, auth user using email and password, local refers to local database
// Create local Strategy
const localOptions = { usernameField: 'email' };
const localLoginTailor = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  Tailor.findOne({ email: email }, function(err, tailor) {
    if (err) { return done(err); }
    if (!tailor) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    tailor.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      // if succesfull passport will make user available under req.user
      return done(null, tailor);
    });
  });
});
//Setup options for JWT strategy
// We need to extract the token from the cookies
const cookieExtractor = (req) => {
    var token = null;

    if (req && req.cookies)
    {
        token = req.cookies['jwt']
    }
    console.log(token)
    return token;
}

// a jwt token can sit anywhere on the request, we need to specify where it is
// instead of extracting the token from the header (whatever name we give it, eg 'authorization'),
// we extract it from the cookies
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: secret
}

// create JWT Strategy
// Payload is decoded JWT token
// Done is callback function that we need to call in order to succesfully auth user
const jwtLoginTailor = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if user ID in payload exists in DB
  // If it does call Done
  // Otherwise, call done with a user object
  Tailor.findById(payload.sub, (error, tailor) => {
    if (error) { return done(error, false) }

    if (tailor) {
      done (null, tailor)
    } else {
      // no error in process of searching user but we did not find a user
      done (null, false)
    }
  })
})

//Tell passport to use this strategy
passport.use('jwtTailor',jwtLoginTailor)
passport.use('localTailor',localLoginTailor)
