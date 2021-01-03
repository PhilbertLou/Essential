//Requiring modules 
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require('dotenv').config();

//Setting up necessary server variables
const app = express();
const port = process.env.PORT || 8080;

//Getting routers and passport set up
require('./config/passport')(passport);
var dailyRouter = require('./routes/dailyDetails');
var usersRouter = require('./routes/userDetails');

//Setting up mongoose
var mongoDB = process.env.DB;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

//Default page
// app.get('/', (req, res) => {
//     res.send('HealthApp Default')
//   })

//Using middleware
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { path: '/', httpOnly: false, secure: false, maxAge: 1000 * 60 * 60 * 25 * 3 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/today', dailyRouter);
app.use('/user', usersRouter);

// app.use(cors())

//Listening on defined port
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
