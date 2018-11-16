const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var fs = require('fs');

app = express();

var rateCalculator = require('./javaScript/rateCalculator.js');

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get("/getRate", function(req, res){
	console.log("A request came in for getRate.");
	var weight = req.query.weight;
	var mailType = req.query.mailType;

	var rate = rateCalculator.calculateRate(weight, mailType);
	console.log("Rate: " + rate);

	verifyPositiveWeight(res, weight, mailType, rate);
	res.end();
});

function verifyPositiveWeight (res, weight, mailType, rate) {
	if (weight < 0)
		res.render("pages/error");
	else
		res.render("pages/getRate", {weight:weight,mailType:mailType,rate:rate});
}