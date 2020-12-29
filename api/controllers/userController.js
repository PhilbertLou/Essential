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

exports.index = async function(req, res) {
    // res.send('NOT IMPLEMENTED: Homepage GET');
    // Prob dont need to send everything, may be too big
    // res.send(req.user);
    var currentuser = await user.findOne({ username: req.user.username });
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    if(req.user.trackedDate === null || req.user.trackedDate !== date){
        if(req.user.trackedDate !== date && req.user.trackedDate !== null){
            var prevday = await day.findOne({ _id: currentuser.currentDay._id });
            prevday.wGoal = currentuser.currentDay.wGoal;
            prevday.suGoal = currentuser.currentDay.suGoal;
            prevday.soGoal = currentuser.currentDay.soGoal;
            prevday.water = currentuser.currentDay.water;
            prevday.sugar = currentuser.currentDay.sugar;
            prevday.sodium = currentuser.currentDay.sodium;

            currentuser.currentDay.updates.forEach(element => {
                prevday.updates.push(element);
            });

            await prevday.save((err) => {
                if(err){
                    res.status(400).send({message:"Total amounts today cannot be negative"});
                    return;
                }
                return;
            })

            currentuser.previousDays.push(currentuser.currentDay);
        }

        var todayModel = new day({wGoal: req.user.wGoal, suGoal: req.user.suGoal, soGoal: req.user.soGoal, date:date});
        await todayModel.save((err)=>{
            if(err){
                res.status(400).send({message:"Error"});
                return;
            }
            //res.status(200).send({message:"Tracked!"});
            // return;
            // console.log('HERE1')
        })
    
        currentuser.currentDay = todayModel;
        currentuser.trackedDate = date;
    
        await currentuser.save((err)=>{
            if(err){
                res.status(400).send({message:"Error updating info"});
                return;
            }
            // res.status(200).send({message:"Tracked!"});
            // return;
            // console.log('HERE1')
        })
    }

    // console.log(currentuser.currentDay);
    res.send({date: currentuser.trackedDate, currentDay: currentuser.currentDay, name: currentuser.name});
    return;
    // console.log('HERE2')
    // wGoal: req.user.wGoal, soGoal: req.user.soGoal, suGoal: req.user.suGoal
};


// exports.mkaccget = function(req, res) {
//     res.send('NOT IMPLEMENTED: Making account GET');
// };

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

        if(req.body.password1 !== req.body.password2){
            res.status(400).send({message:"Passwords do not macth"});
            return;
        }   

        var password = req.body.password1;
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

//comment out later
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

// exports.chinfoget = async function(req, res) {
//     res.send('NOT IMPLEMENTED: Changing info GET');
// };

exports.chgoalspost = async function(req, res) {
    // res.send('NOT IMPLEMENTED: Changing info POST');
    //if goals are changed, make sure you change it for that specific day too
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var currentuser = await user.findOne({ username: req.user.username });
    currentuser.wGoal = req.body.newwatergoal;
    currentuser.soGoal = req.body.newsodiumgoal;
    currentuser.suGoal = req.body.newsugargoal;

    currentuser.currentDay.wGoal = req.body.newwatergoal;
    currentuser.currentDay.soGoal = req.body.newsodiumgoal;
    currentuser.currentDay.suGoal = req.body.newsugargoal;

    await currentuser.save((err)=>{
        if(err){
            res.status(400).send({message:"Error updating info"});
            return;
        }
    })
    res.status(200).send({message:"Updated"});
    return;
};

exports.chpasspost = async function(req, res) {
    // res.send('NOT IMPLEMENTED: Changing info POST');
    
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if(req.body.password1 !== req.body.password2){
        res.status(400).send({message:"Passwords do not match"});
        return;
    }   

    var currentuser = await user.findOne({ username: req.user.username });

    var password = req.body.password1;
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    password = hashedpass;

    currentuser.password = password;

    await currentuser.save((err) =>{
        if(err){
            res.status(400).send({message:"Error updating info"});
            return;
        }
    })

    res.status(200).send({message: "Password changed"});
};

//Option 1
exports.previous1 = function(req, res) {
    //res.send('NOT IMPLEMENTED: Getting previous days info');
    res.send(req.user.previousDays);
};

//option 2
exports.previous2 = function(req, res) {
    res.send('NOT IMPLEMENTED: Getting previous days info');
};


// exports.updates = function(req, res) {
//     res.send('NOT IMPLEMENTED: Getting previous updates for the day');
// };