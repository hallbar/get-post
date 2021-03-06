var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/get-post', function(req, res) {
	var queryParams = [];
	for (var param in req.query) {
		queryParams.push({
			'name': param,
			'val': req.query[param]
		});
	}
	var context = {};
	context.type = 'GET';
	context.param = queryParams;
	res.render('get-post', context);
});

app.post('/get-post', function(req, res){
	var queryParams = [];
	for (var param in req.body) {
		queryParams.push({
			'name': param,
			'val': req.body[param]
		});
	}
	var context = {};
	context.type = 'POST';
	context.param = queryParams;
	res.render('get-post', context);
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});