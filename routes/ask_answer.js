var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sha1 = require('sha1');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = req.query.toString();
	console.log("data is " + data);
	res.send("success");
	 
});

module.exports = router;
