const mongoose = require('mongoose');
// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
// require('dotenv').config();

const user = require('../models/user');

// var mongoDB = process.env.DB;
// const connection = mongoose.createConnection(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// mongoose.Promise = global.Promise;

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ username: 'username'}, (username, password, done) => {
            user.findOne( {username: username} )
            .then(user => {
                if (!user){
                    return done(null, false, {message: 'unregistered username'});
                }

                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    } else{
                        return done(null, false, { Message: 'Incorrect password'});
                    }
                })
            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) =>{
        user.findById(id, (err, user) =>{
            done(err, user);
        })
    });
    
}

