//Requiring necessary modules
var day = require('../models/day');
var user = require('../models/user');
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");
const { body, validationResult } = require('express-validator');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

//Change redirects to your own success/fail method you make yourself

//TDates shouldnt overlap, but maybe add something to prevent duplicate dates or make it modify the same date doc

//Sends back the current day's info to the user
exports.index = async function(req, res) {
    var currentuser = await user.findOne({ username: req.user.username });
    
    // console.log(currentuser.currentDay);
    res.status(200).send({date: currentuser.trackedDate, currentDay: currentuser.currentDay, name: currentuser.name});
    return;
};

//Checks if the user is on the correct date, if not it will update it for them
exports.checkday = async function(req,res){
    var currentuser = await user.findOne({ username: req.user.username });
    var error;
    const date = req.body.date;
    //If the current day is not the tracked date, a fresh day will be made 
    if(req.user.trackedDate === null || req.user.trackedDate !== date){
        if(req.user.trackedDate !== date && req.user.trackedDate !== null){
            //Actual day object is being changed and saved so it can be accessed easier from its own cluster
            var prevday = await day.findOne({ _id: currentuser.currentDay._id });
            prevday.wGoal = currentuser.currentDay.wGoal;
            prevday.suGoal = currentuser.currentDay.suGoal;
            // prevday.soGoal = currentuser.currentDay.soGoal;
            prevday.water = currentuser.currentDay.water;
            prevday.sugar = currentuser.currentDay.sugar;
            // prevday.sodium = currentuser.currentDay.sodium;

            currentuser.currentDay.updates.forEach(element => {
                prevday.updates.push(element);
            });

            await prevday.save((err) => {
                if(err){
                    error = true;
                    return;
                }
                return;
            })
            if(error){
                res.status(400).send({message:"Total amounts today cannot be negative"});
                return;
            }
            currentuser.previousDays.push({date: currentuser.currentDay.date, id: currentuser.currentDay._id});
        }
        // soGoal: req.user.soGoal,
        var todayModel = new day({wGoal: req.user.wGoal, suGoal: req.user.suGoal, date:date});
        await todayModel.save((err)=>{
            if(err){
                error = true;
                return;
            }
        })
        if(error){
            res.status(400).send({message:"Error"});
            return;
        }
    
        currentuser.currentDay = todayModel;
        currentuser.trackedDate = date;
    
        await currentuser.save((err)=>{
            if(err){
                error = true;
                return;
            }
        })

        if(error){
            res.status(400).send({message:"Error updating info"});
            return;
        }
        res.status(200).send({message:"DIFFERENT DAY!"});
        return;
    }
    res.status(200).send({message:"SAME DAY!"});
    return;
}   

//If this function is called it will return an OK status
exports.logincheck = function(req,res){
    // if(req.user){
    //     res.status(200);
    //     return;
    // }
    res.status(200).send({message: 'Logged in!'});
    return;
}

// exports.mkaccget = function(req, res) {
//     res.send('NOT IMPLEMENTED: Making account GET');
// };

//Makes an account
exports.mkaccpost = async function(req, res) {
    var error;
    try{
        //Checking the validation results first before anything
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            var spot = errors.array()[0].param;
            if (spot === "name"){
                spot = " for Name"
            }
            else if(spot === "username"){
                spot = " for Username"
            }
            else if(spot === "password1"){
                spot = " for Password (Reminder, password must be 8 characters minimum)"
            }
            else if(spot === "watergoal"){
                spot = " for Water Goal"
            }
            else if(spot === "sugargoal"){
                spot = " for Sugar Goal"
            }
            // else if(spot === "sodiumgoal"){
            //     spot = " for Sodium Goal"
            // }
            else{
                spot = "s"
            }
            return res.status(400).json({ message: "Invalid value" + spot});
        }

        //Checking if the username is already registered
        const doesExist = await user.findOne({username: req.body.username});
        if(doesExist){
            res.status(400).send({message:"Username taken"});
            return;
        }

        //Making sure that the passwords match
        if(req.body.password1 !== req.body.password2){
            res.status(400).send({message:"Passwords do not macth"});
            return;
        }   

        var password = req.body.password1;
        const name = req.body.name;
        const username = req.body.username;
        const watergoal = req.body.watergoal;
        // const sodiumgoal = req.body.sodiumgoal;
        const sugargoal = req.body.sugargoal;

        //Encrypting the password
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);
        password = hashedpass;

        //save model here
        // soGoal: sodiumgoal,
        var userinstance = new user({ name: name, username:username, password:password, wGoal: watergoal,
             suGoal: sugargoal});
        
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

// exports.loginget = function(req, res) {
//     res.send('NOT IMPLEMENTED: Login GET');
// };

//Using passport to authenticate the user
exports.loginpost = function(req, res, next) {
    passport.authenticate('local', function(err, user, info){
        if (err) { return nexr(err); }
        if(!user) {return res.status(400).send({message: 'Incorrect username or password'});}
        req.logIn(user, function(err){
            if (err) {return next(err);}
            return res.status(200).send({message: 'Logged in!'});
        })
    }) (req, res, next);
    // res.send({message:'here'});
};

//Logging out function
exports.logout = function(req, res) {
    //res.send('NOT IMPLEMENTED: Logout POST');
    req.logout();
    // res.redirect('login');
    res.status(200).send({message: 'Logged out'});
};

// exports.chinfoget = async function(req, res) {
//     res.send('NOT IMPLEMENTED: Changing info GET');
// };

//Changes the daily goals
exports.chgoalspost = async function(req, res) {
    //if goals are changed, make sure you change it for that specific day too
    var error;
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        var spot = errors.array()[0].param;
        if(spot === "newwatergoal"){
            spot = " for Water Goal"
        }
        else if(spot === "newsugargoal"){
            spot = " for Sugar Goal"
        }
        // else if(spot === "newsodiumgoal"){
        //     spot = " for Sodium Goal"
        // }
        else{
            spot = "s"
        }
        res.status(400).send({ message: "Invalid value" + spot });
        return;
    }

    //Changes the goal for the user and the goal for the current day
    var currentuser = await user.findOne({ username: req.user.username });
    currentuser.wGoal = req.body.newwatergoal;
    // currentuser.soGoal = req.body.newsodiumgoal;
    currentuser.suGoal = req.body.newsugargoal;

    currentuser.currentDay.wGoal = req.body.newwatergoal;
    // currentuser.currentDay.soGoal = req.body.newsodiumgoal;
    currentuser.currentDay.suGoal = req.body.newsugargoal;

    await currentuser.save((err)=>{
        if(err){
            error = true
        }
        return;
    })
    if(error){
        res.status(400).send({message:"Error updating info"});
        return;
    }
    res.status(200).send({message:"Updated"});
    return;
};

//Async compare function
function compareAsync(param1, param2) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(param1, param2, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}

//Changes the password, implemented similarly to the mkaccpost method
exports.chpasspost = async function(req, res) {
    // res.send('NOT IMPLEMENTED: Changing info POST');
    var error;
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        var spot = errors.array()[0].param;
        if(spot === "password1"){
            spot = " for Password 1 (Reminder, password must be 8 characters minimum)"
        }
        else{
            spot = "s"
        }
        return res.status(400).send({ message: "Invalid value" + spot });
    }

    const passequal = await compareAsync(req.body.password, req.user.password);
    
    if(!passequal){
        res.status(400).send({message:"Current password is incorrect"});
        return;
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
            error = true;
            return;
        }
    })
    if(error){
        res.status(400).send({message:"Error updating info"});
        return;
    }
    res.status(200).send({message: "Password changed"});
    return;
};

//Option 1 (not used)
exports.previous1 = function(req, res) {
    //res.send('NOT IMPLEMENTED: Getting previous days info');
    res.status(200).send(req.user.previousDays);
};

//option 2 (should be more lightweight)
exports.previous2 = async function(req, res) {
    //If there is a URL param, itll return info for that specific date
    if(req.params.date && req.params.id){
        try{   
            var wantday = await day.findOne( {date: req.params.date, _id:req.params.id} );
            if(wantday){
                res.status(200).json(wantday);
                return;
            }
            res.status(400).send({message:"Day does not exist"});
            return;
        }catch{
            res.status(400).send({message:"Error getting previous days"});
            return;
        }
    }

    //Otherwise, a list of all previous dates are sent back
    try{
        var currentuser = await user.findOne({ username: req.user.username });
        res.status(200).send(currentuser.previousDays)
        return;
    }catch{
        res.status(400).send({message:"Error getting previous days"});
        return;
    }

};

//This part has been combined with the part above
// //option 2 pt 2
// exports.previous2pt2 = async function(req, res){
//     try{   
//         var wantday = await day.findOne( {date: req.params.date} );
//         if(wantday){
//             res.status(200).json(wantday);
//             return;
//         }
//         res.status(400).send({message:"Day does not exist"});
//         return;
//     }catch{
//         res.status(400).send({message:"Error getting previous days"});
//         return;
//     }
// }


// exports.updates = function(req, res) {
//     res.send('NOT IMPLEMENTED: Getting previous updates for the day');
// };