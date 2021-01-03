//Ensures user is logged in
module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        // res.redirect('/user/login')
        res.status(400).send({message: 'Please log in'});
    }
}
