var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var update = require('./update');

var dayModel = new Schema({
    wGoal: {
        type: Number,
        required: true
    },
    soGoal: {
        type: Number,
        required: true
    },
    suGoal: {
        type: Number,
        required: true
    },
    
    water:{
        type: Number,
        default: 0
    },
    sugar: {
        type: Number,
        default: 0
    },
    sodium: {
        type: Number,
        default: 0
    },
    date: Date
  });

  module.exports = mongoose.model('day', dayModel);