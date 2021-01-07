//Ensures that user is NOT logged in
module.exports = {
    checkNotAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        // res.redirect('/user/homepage');
        res.status(400).send({message:'You cannot do that while logged in'});
    }
}