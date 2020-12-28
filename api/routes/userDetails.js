var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../config/auth');
const { checkNotAuthenticated } = require('../config/auth2');

//body('username').isLength({ min: 1 }), body('password').isLength({ min: 8 }), body('wGoal').isLength({ min: 0 }), 
//body('soGoal').isLength({ min: 0 }), body('suGoal').isLength({ min: 0 }), 

//Require controllers here
var uC = require('../controllers/userController');

//Add Routes
router.get('/homepage', ensureAuthenticated, uC.index);

router.get('/login', checkNotAuthenticated, uC.loginget);
router.post('/login', checkNotAuthenticated, uC.loginpost);

router.post('/logout', checkNotAuthenticated, uC.logout);

router.get('/makeaccount', checkNotAuthenticated, uC.mkaccget);
router.post('/makeaccount', checkNotAuthenticated, body('watergoal').isFloat({ min: 0 }), body('sodiumgoal').isFloat({ min: 0 }), 
body('sugargoal').isFloat({ min: 0 }), body('username').notEmpty(), 
body('name').notEmpty(), body('password').isLength({ min: 8 }),uC.mkaccpost);

router.get('/changeinfo', ensureAuthenticated, uC.chinfoget);
router.post('/changeinfo', ensureAuthenticated, uC.chinfopost);

router.get('/previousdays', ensureAuthenticated, uC.previous);

router.get('/updates', ensureAuthenticated, uC.updates);


module.exports = router;