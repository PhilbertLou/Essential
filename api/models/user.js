var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var day = require('./day');
var update = require('./update');

var userModel = new Schema({
    name: {
        type: String,
        required: [true, 'please enter your name']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'please enter your username']
    },
    password: {
        type: String,
        required: [true, 'please enter your password']
    },
    wGoal: {
        type: Number,
        min: [250, 'please drink more water'],
        required: [true, 'please drink water']
    },
    soGoal: {
        type: Number,
        min: [0, 'value cannot be nonnegative'],
        required: [true, 'please fill out your sodium goal']
    },
    suGoal: {
        type: Number,
        min: [0, 'value cannot be nonnegative'],
        required: [true, 'please fill out your sugar goal']
    },
    updates: {
        type: [update.schema],
        default: null
    },
    previousDays: {
        type: [day.schema],
        default: null
    },
    trackedDate: {
        //FIND A WAY TO USE THEIR TIMEZONE
        type: String,
        default: null
    },
    currentDay: {
        type: day.schema,
        default: null
    }
  });

// userModel.pre('save', async function(next){
//     try{
//         const salt = await bcrypt.genSalt(10);
//         // console.log('here!')
//         const hashedpass = await bcrypt.hash(this.password, salt);
//         this.password = hashedpass;
//         next();
//     }catch(err){
//         next(err);
//     }
// });

userModel.methods.comparePassword = function(password,cb){
    bcrypt.compare(password, this.password, (err,isMatch)=>{
        if (err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null, ismatch);
            return cb(null,this);
        }
    })
}

  userModel.plugin(uniqueValidator);
  module.exports = mongoose.model('user', userModel);
