module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()) {
      return next();
      //next function continiues the request call
    }
    //else
    req.flash('error_msg', "Please login to see this page");
    res.redirect('/users/login');
  }
}
