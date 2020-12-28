module.exports = {
    checkNotAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/user/homepage');
    }
}