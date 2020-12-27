var mongoose = require('mongoose');
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
    password: String,
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
    updates: [update.schema],
    previousDays: [day.schema],
    trackedDate: Date,
    currentDay: day.schema
  });

  userModel.plugin(uniqueValidator);
  module.exports = mongoose.model('user', userModel);
