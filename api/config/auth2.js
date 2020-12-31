//Ensures that user is NOT logged in
module.exports = {
    checkNotAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/user/homepage');
    }
}