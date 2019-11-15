const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

//User Model
const User = require('../model/Users')
// Login page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.route('/register')
.post(function(req, res){
  const { name, email, password, password2} = req.body
  let errors = [];

  if(!name || !email || !password || !password2) {
    error.push({msg: 'Please fill all fields'});
  }

  //Check passwords
  if(password !== password2){
    errors.push({msg: 'Passwords do not match'});
  }

  //Check Password Length
  if(password.length<6){
    errors.push({msg: 'Password too short. Password must be at least 6 characters'});
  }

if(errors.length > 0) {
  res.render('register', {
    errors,
    name,
    email,
    password,
    password2
  });
} else {
  //Validation Pass
  User.findOne({email: email})
  //returns promosie
  .then(user=>{
    if(user) {
      //user exist
      error.push({msg:'That User already exist'})
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });

    } else {
      const newUser = new User({
        name: name,
        password: password,
        email: email
      });

      //Hash Password
      bcrypt.genSalt(10, (err, salt) =>
      //salt = generating random bytes and combining it with password to prevent rainbow table attacks(same passwords can have different hash passwords)
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err) throw err;
        //set password to hash
        newUser.password = hash

      //save user
      newUser.save()
        .then(user=>{
          req.flash('success_msg', "You are registered, please login");
          res.redirect('/users/login')
        })
        .catch(err=>console.log(err));
      })
    );
    }
  })
}
});

//Login handle
router.route('/login')
  .post(function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
    //flash saved as 'error'
  })(req, res, next);
});

//Logout Handle

router.get('/logout', (req,res) =>{
  req.logout();
  req.flash('success_msg', "You have been succefully logged out");
  res.redirect('/users/login');
});
module.exports = router;
