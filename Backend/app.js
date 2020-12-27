const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

var dailyRouter = require('./routes/dailyDetails');
var usersRouter = require('./routes/userDetails');

var mongoDB = process.env.DB;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
    res.send('HealthApp Default')
  })

// app.use(cors())
app.use(passport.initialize());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/today', dailyRouter);
app.use('/user', usersRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
