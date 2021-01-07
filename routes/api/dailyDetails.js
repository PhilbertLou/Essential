//Requring necessary modules
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../../config/auth');

//Require controllers here
var dC = require('../../controllers/dailyController');

//Added neccessary routes 
// body('sodium').notEmpty(),
router.post('/addinfo', ensureAuthenticated, body('water').notEmpty(), body('sugar').notEmpty(), dC.addInfo);

// router.post('/addwater', dC.addWater);

// router.post('/addsodium', dC.addSodium);

// router.post('/addsugar', dC.addSugar);

// router.post('/changegoals', dC.changeGoals);

module.exports = router;