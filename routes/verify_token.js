var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var xmlparser = require('express-xml-bodyparser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(xmlparser());

router.get('/', function(req, res, next) {
	var signature = req.query.signature;
	var echostr = req.query.echostr;
	var nonce = req.query.nonce;
	var timestamp = req.query.timestamp;

	console.log("signature is " + signature);
	console.log("echostr is " + echostr);
	console.log("nonce is " + nonce);
	console.log("timestamp is " + timestamp);
	
	var token = "bigeasypancom";
	
	if (nonce === undefined || signature === undefined || echostr === undefined || timestamp === undefined) {
		res.send("success");
	} else {
		var list = [token, timestamp, nonce];
		list.sort();
		var listStr = "";
		for (var i = 0; i < list.length; i ++) {
			listStr += list[i];
		}
		console.log("before sha1 is " + listStr);
		listStr = sha1(listStr);
		console.log("after sha1 is " +listStr );
		if (listStr === signature) {
			res.send(echostr);
		} else { 
			res.send("success");
		}
	}
	 
});

router.post("/", function(req, res, next) {
	var data = req.body.toString();
	console.log("data is " + data);
	res.send("success");
});

module.exports = router;
