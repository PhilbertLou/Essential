var day = require('../models/day');
var user = require('../models/user');
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { msg: "Incorrect password" });
        }
        return done(null, user);
      });
    })
  );

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Homepage GET');
};

exports.mkaccget = function(req, res) {
    res.send('NOT IMPLEMENTED: Making account GET');
};

exports.mkaccpost = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Making account POST');
    if(req.body.password.length < 8){
        res.redirect('/register');
        //Let them know they need a longer password
    }

    //not sure if i need try catch here
    try{
        //How do I ensure these are filled out / what happens if a section isnt filled and I try to access a nonexistent key?
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const name = req.body.name;
        const username = req.body.username;

        //Make sure these values are nonnegative
        // try{
        //     const watergoal = req.body.watergoal;
        // }
        // catch{
        //     const watergoal = 0;
        // }
        // try{
        //     const sodiumgoal = req.body.sodiumgoal;
        // }
        // catch{
        //     const sodiumgoal = 0;
        // }
        // try{
        //     const sugargoal = req.body.sugargoal;
        // }
        // catch{
        //     const sugargoal = 0;
        // }

        const watergoal = req.body.watergoal;
        const sodiumgoal = req.body.sodiumgoal;
        const sugargoal = req.body.sugargoal;
        //save model here

        var userinstance = await new user({ name: name, username:username, password:hashedPass, wGoal: watergoal,
            soGoal: sodiumgoal, suGoal: sugargoal});

        userinstance.save(function (err) {
            console.log(err);
            res.redirect('/register');
            //Let them know they didnt fulfill requirements, like redirect the response to login 
            //but add a json with error key in the request bdoy
        });

        res.redirect('/login');
    }
    catch{
        res.redirect('/register');
    }
};

exports.loginget = async function(req, res) {
    res.send('NOT IMPLEMENTED: Login GET');
};

exports.loginpost = function(req, res) {
    res.send('NOT IMPLEMENTED: Login POST');
};

exports.chinfoget = async function(req, res) {
    res.send('NOT IMPLEMENTED: Changing info GET');
};

exports.chinfopost = function(req, res) {
    res.send('NOT IMPLEMENTED: Changing info POST');
};

exports.previous = function(req, res) {
    res.send('NOT IMPLEMENTED: Getting previous days info');
};

exports.updates = function(req, res) {
    res.send('NOT IMPLEMENTED: Getting previous updates for the day');
};