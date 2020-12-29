var day = require('../models/day');
var user = require('../models/user');
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");
const { body, validationResult } = require('express-validator');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// const { ensureAuthenticated } = require('../config/auth');

//Change redirects to your own success/fail method you make yourself

exports.index = function(req, res) {
    // res.send('NOT IMPLEMENTED: Homepage GET');
    res.send('Hi ' + req.user.name);
};

exports.mkaccget = function(req, res) {
    res.send('NOT IMPLEMENTED: Making account GET');
};

exports.mkaccpost = async function(req, res) {
    try{
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const doesExist = await user.findOne({username: req.body.username});
        if(doesExist){
            res.status(400).send({message:"Username taken"});
            return;
        }
        var password = req.body.password;
        const name = req.body.name;
        const username = req.body.username;
        const watergoal = req.body.watergoal;
        const sodiumgoal = req.body.sodiumgoal;
        const sugargoal = req.body.sugargoal;

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);
        password = hashedpass;

        //save model here
        var userinstance = new user({ name: name, username:username, password:password, wGoal: watergoal,
            soGoal: sodiumgoal, suGoal: sugargoal});
        
        await userinstance.save(function (err) {
            if(err){
                res.status(400).send({message:"Please enter valid values"});
                return;
            }
            res.status(200).send({message:"Account created"});
            return;
        });

    }
    catch(err){
        res.status(400).send({message:"An Error Occured"});
        return;
    }
};

exports.loginget = function(req, res) {
    res.send('NOT IMPLEMENTED: Login GET');
};

exports.loginpost = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Login POST');
    passport.authenticate('local', {
        successRedirect: 'homepage',
        failureRedirect: 'login',
        failureFlash: true
    }) (req, res, next);
    // res.send({message:'here'});
};

exports.logout = function(req, res) {
    //res.send('NOT IMPLEMENTED: Logout POST');
    req.logout();
    res.redirect('login');
};

exports.chinfoget = async function(req, res) {
    res.send('NOT IMPLEMENTED: Changing info GET');
};

exports.chinfopost = function(req, res) {
    res.send('NOT IMPLEMENTED: Changing info POST');
    //if goals are changed, make sure you change it for that specific day too
};

exports.previous = function(req, res) {
    res.send('NOT IMPLEMENTED: Getting previous days info');
};

exports.updates = function(req, res) {
    res.send('NOT IMPLEMENTED: Getting previous updates for the day');
};