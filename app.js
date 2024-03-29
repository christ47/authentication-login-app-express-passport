const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//passport config
require('./config/passport')(passport); 
// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
//returns promise
  .then(()=> console.log("Mongo DB Connected..."))
  .catch((err)=> console.error(err))
// EJS
app.use(expressLayouts);
app.set('views', __dirname + '\\views');
app.set('view engine', 'ejs');
// BodyParser
app.use(express.urlencoded({extended: true}));
//so we can get data on form with request.body

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect-flash
app.use(flash());


//Global Vars/middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routers/index'));
app.use('/users', require('./routers/users'));

const PORT = process.env.PORT || 808;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
