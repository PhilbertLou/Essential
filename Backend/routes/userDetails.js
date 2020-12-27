var express = require('express');
var router = express.Router();

//Require controllers here
var uC = require('../controllers/userController');

//Add Routes
router.get('/', uC.index);

router.get('/login', uC.loginget);
router.post('/login', uC.loginpost);

router.get('/makeaccount', uC.mkaccget);
router.post('/makeaccount', uC.mkaccpost);

router.get('/changeinfo', uC.chinfoget);
router.post('/changeinfo', uC.chinfopost);

router.get('/previousdays', uC.previous);

router.get('updates', uC.updates);


module.exports = router;