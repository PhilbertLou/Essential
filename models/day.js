//Requiring necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var update = require('./update');

//Setting a key for each necessary thing that needs to be tracked
var dayModel = new Schema({
    wGoal: {
        type: Number,
        required: true
    },
    // soGoal: {
    //     type: Number,
    //     required: true
    // },
    suGoal: {
        type: Number,
        required: true
    },
    
    water:{
        type: Number,
        default: 0,
        min: [0, 'value cannot be nonnegative'],
    },
    sugar: {
        type: Number,
        default: 0,
        min: [0, 'value cannot be nonnegative'],
    },
    // sodium: {
    //     type: Number,
    //     default: 0,
    //     min: [0, 'value cannot be nonnegative'],
    // },
    date: {
        type: String,
        default: ""
    },
    updates: {
        type: [update.schema],
        default: null
    },
    // uid: [Schema.Types.ObjectId]
  });

  module.exports = mongoose.model('day', dayModel);