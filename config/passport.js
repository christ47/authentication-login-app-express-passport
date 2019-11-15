const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../model/Users');

module.exports = function(passport){
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done)=>{
      //check user matches

      //see if there is an email that matches the inputted email
      User.findOne({email: email})
      .then(user=> {
        if(!user){
        return done(null, false, {message: 'That email is not registered'})
        //done(error, user:any, options)
      }
      // check if password exists
      bcrypt.compare(password, user.password, (err, isMatch)=>{
        //compare plain text and hash password. produced boolean
        if(err) throw err;

      if(isMatch){
        return done(null, user);

      } else {
        return done(null, user, {message: 'Password or User incorrect!'})
      }
    });
    })
      .catch(err => console.log(err))
    })
  );
  passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user)=> {
    done(err, user);
  });
});
}
