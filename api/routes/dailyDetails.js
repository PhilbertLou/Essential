var express = require('express');
var router = express.Router();

//Require controllers here
var dC = require('../controllers/dailyController');

//Add routes here
router.post('/addwater', dC.addWater);

router.post('/addsodium', dC.addSodium);

router.post('/addsugar', dC.addSugar);

router.post('/changegoals', dC.changeGoals);

module.exports = router;