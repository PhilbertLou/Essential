//Requiring modules 
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require('cors');
require('dotenv').config();

//Setting up necessary server variables
const app = express();
const port = process.env.PORT || 8080;

//Getting routers and passport set up
require('./config/passport')(passport);
var dailyRouter = require('./routes/api/dailyDetails');
var usersRouter = require('./routes/api/userDetails');

//Setting up mongoose
// var mongoDB = process.env.DB; mongoDB <--- replaced by current for Heroku deployment
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors({
  origin: origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:3000/$/'],
  methods: "GET,POST,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/today', dailyRouter);
app.use('/user', usersRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

//Listening on defined port
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
