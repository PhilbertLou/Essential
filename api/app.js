const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require('connect-flash');
// const passportLocalMongoose = require('passport-local-mongoose');
// MongoStore = require('connect-mongo')(session);
// require('./config/passport');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

require('./config/passport')(passport);
var dailyRouter = require('./routes/dailyDetails');
var usersRouter = require('./routes/userDetails');

var mongoDB = process.env.DB;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// const connection = mongoose.createConnection(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;


app.get('/', (req, res) => {
    res.send('HealthApp Default')
  })

// app.use(cors())
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { path: '/', httpOnly: false, secure: false, maxAge: 1000 * 60 * 60 * 25 * 3 }
  //cors and origin stuff
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/today', dailyRouter);
app.use('/user', usersRouter);

// UserDetail.plugin(passportLocalMongoose);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
