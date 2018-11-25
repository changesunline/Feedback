var fs = require('fs');
var http = require('http');
var url = require('url');
var template = require('art-template');
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

// test
// console.log(comments);
// console.log(url.parse('http://localhost:3000/pinglun?name=changesunl&message=看风景啊社会封建啊',true));

// ======================Vanilla JS版本===========================
http
	.createServer(function (req,res) {
		// response.setHeader('Content-Type','text/plain; charset=utf-8');
		var pathObj = url.parse(req.url,true);
		var pathname = pathObj.pathname;
		if (pathname === '/') {
			fs.readFile('./views/index.html',function (error,data) {
				if (error) {
					return res.end('404 Not Found');
				}
				
				res.end(template.render(data.toString(), file));
			});
		} else if (pathname === '/post') {
			fs.readFile('./views/post.html',function (error,data) {
				if (error) {
					return res.end('404 Not Found');
				}
				res.end(data);
			});
		} else if (pathname === '/pinglun') {
			// console.log(pathObj.query);
			var list = pathObj.query;
			list.date = getCurrentTime();
			comments.unshift(list);
			res.statusCode = 302;
			res.setHeader('Location','/');
			res.end();


		} else if (pathname.indexOf('/public/') === 0) {
			// console.log(pathname);
			fs.readFile('.' + pathname,function (error,data) {
				if (error) {
					return res.end('404 Not Found');
				}
				res.end(data);
			});
		} else {
			fs.readFile('./views/404.html',function (error,data) {
				if (error) {
					return res.end('404 Not Found');
				}
				res.end(data);
			});
		}
	})
	.listen(3000,function () {
		console.log('Server is running...');
	});