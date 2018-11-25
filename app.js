var fs = require('fs');
var url = require('url');
var template = require('art-template');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var file = require('./public/js/comments'); 
var comments = file.comments;

var getCurrentTime = function () {
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate().toString().length < 2 ? '0' + time.getDate() : time.getDate();
	var hour = time.getHours().toString().length < 2 ? '0' + time.getHours() : time.getHours();
	var minute = time.getMinutes().toString().length < 2 ? '0' + time.getMinutes() : time.getMinutes();
	var second = time.getSeconds().toString().length < 2 ? '0' + time.getSeconds() : time.getSeconds();
	var date = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

	return date;
}



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// ========================express版本============================
app.engine('html', require('express-art-template'));

app.use('/public/',express.static('./public/'));

app
	.get('/',function (req,res) {
		res.render('index.html', file);		
	})
	.get('/post',function (req,res) {
		res.render('post.html');
	})
	.post('/post',function (req,res) {
		var list = req.body;
		list.date = getCurrentTime();
		comments.unshift(list);
		res.redirect('/');
	});
	

app.listen(3000,function () {
	console.log('express-Server is running...');
});

