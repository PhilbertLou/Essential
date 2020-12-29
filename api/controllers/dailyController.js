var update = require('../models/update');
var day = require('../models/day');
var user = require('../models/user');
const { body, validationResult } = require('express-validator');
var mongoose = require('mongoose');
const e = require('express');
mongoose.set('useCreateIndex', true);
//All POST requests

exports.addInfo = async function(req, res) {
    //res.send('NOT IMPLEMENTED: Adding everything');
    try{
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        if(req.user.trackedDate === null){
            // console.log("NEW ACC");
            // console.log(req.user.trackedDate);

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            var todayModel = new day({wGoal: req.user.wGoal, suGoal: req.user.suGoal, soGoal: req.user.soGoal,
                water: req.body.water, sodium: req.body.sodium, sugar: req.body.sugar, date:date});

            //test this
            await todayModel.save((err)=>{
                if(err){
                    res.status(400).send({message:"Total amounts today cannot be negative"});
                    return;
                }
                //res.status(200).send({message:"Tracked!"});
                return;
            })

            var currentuser = await user.findOne({ username: req.user.username });
            //console.log(currentuser.name);
            currentuser.currentDay = todayModel;


            currentuser.trackedDate = date;

            var updateModel = new update({water: req.body.water, sodium: req.body.sodium, sugar: req.body.sugar, time: time});
            await updateModel.save((err)=>{
                if(err){
                    res.status(400).send({message:"Error updating info"});
                    return;
                }
                //res.status(200).send({message:"Tracked!"});
                return;
            })

            currentuser.currentDay.updates.push(updateModel);

            await currentuser.save((err)=>{
                if(err){
                    res.status(400).send({message:"Error updating info"});
                    return;
                }
                res.status(200).send({message:"Tracked!"});
                return;
            })
        }else{
            var currentuser = await user.findOne({ username: req.user.username });
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            if(req.user.trackedDate !== date){
                // console.log("NEW DAY");
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

                // currentuser.previousDays.push(currentuser.currentDay);
                currentuser.previousDays.push(currentuser.currentDay.date);
                
                var todayModel = new day({wGoal: req.user.wGoal, suGoal: req.user.suGoal, soGoal: req.user.soGoal,
                    water: req.body.water, sodium: req.body.sodium, sugar: req.body.sugar, date:date});
    
                await todayModel.save((err)=>{
                    if(err){
                        res.status(400).send({message:"Total amounts today cannot be negative"});
                        return;
                    }
                    //res.status(200).send({message:"Tracked!"});
                    return;
                })

                currentuser.currentDay = todayModel;
                currentuser.trackedDate = date;
                
                var updateModel = new update({water: req.body.water, sodium: req.body.sodium, sugar: req.body.sugar, time: time});
                await updateModel.save((err)=>{
                    if(err){
                        res.status(400).send({message:"Error updating info"});
                        return;
                    }
                    //res.status(200).send({message:"Tracked!"});
                    return;
                })

                currentuser.currentDay.updates.push(updateModel);

                await currentuser.save((err)=>{
                    if(err){
                        res.status(400).send({message:"Error updating info"});
                        return;
                    }
                    res.status(200).send({message:"Tracked!"});
                    return;
                })

            }else{
                // console.log("SAME DAY");
                var newwater = currentuser.currentDay.water + req.body.water;
                var newsodium = currentuser.currentDay.sodium + req.body.sodium;
                var newsugar = currentuser.currentDay.sugar + req.body.sugar;

                if(newwater < 0 || newsodium < 0 || newsugar < 0){
                    res.status(400).send({message:"Updated values cannot be negative"});//can make it just 0 too
                    return;
                }

                var updateModel = new update({water: req.body.water, sodium: req.body.sodium, sugar: req.body.sugar, time: time});
                await updateModel.save((err)=>{
                    if(err){
                        res.status(400).send({message:"Error updating info"});
                        return;
                    }
                    //res.status(200).send({message:"Tracked!"});
                    return;
                })
                currentuser.currentDay.updates.push(updateModel);

                currentuser.currentDay.water = newwater;
                currentuser.currentDay.sodium = newsodium;
                currentuser.currentDay.sugar = newsugar;
                

                // await currentuser.currentDay.save((err)=>{
                //     if(err){
                //         res.status(400).send({message:"Total amounts today cannot be negative"});
                //         return;
                //     }
                //     //res.status(200).send({message:"Tracked!"});
                //     return;
                // })

               await currentuser.save((err)=>{
                    if(err){
                        res.status(400).send({message:"Error updating info"});
                        return;
                    }
                    res.status(200).send({message:"Tracked!"});
                    return;
                })
            }
        }
    }catch(err){
        res.status(400).send({message:"An Error Occured"});
    }
};

// exports.addWater = function(req, res) {
//     res.send('NOT IMPLEMENTED: Adding water');
// };

// exports.addSodium = function(req, res) {
//     res.send('NOT IMPLEMENTED: Adding sodium');
// };

// exports.addSugar = function(req, res) {
//     res.send('NOT IMPLEMENTED: Adding sugar');
// };

// exports.changeGoals = function(req, res) {
//     res.send('NOT IMPLEMENTED: Changing goals');
// };