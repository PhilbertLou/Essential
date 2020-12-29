var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var updateModel = new Schema({
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
    time: String
  });

  module.exports = mongoose.model('update', updateModel);