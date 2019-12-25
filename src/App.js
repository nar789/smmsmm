;(function(){

	module.exports = function(){
		function global(){
			var express;
			var app;
			var bodyParser;
			var mysql;
			var session;
			var fileStore;
			var multer;
			var upload;
			var list1; // DividendList by date
			var list2; // DividendList by dividend order by assignDate 2019
			var list3; // DividendList by dividend order by assignDate 2018
			var list4; // DividendList by assignDate
		}

		function loadDividendList(){
			lists = require('./DividendManager.js')().load();
			_g.list1 = lists.list1;
			_g.list2 = lists.list2;
			_g.list3 = lists.list3;
			_g.list4 = lists.list4;
		}

		function loadNodeModules() {
			_g=new global();//static global
			_g.express = require('express');
			_g.app = require('express')();
			_g.bodyParser = require('body-parser');
			_g.mysql = require('mysql');
			_g.session = require('express-session');
			_g.fileStore = require('session-file-store')(_g.session);
			// for file upload
			_g.multer  = require('multer');
			_g.upload = _g.multer({ dest: './uploads' });
		}

		function loadRoute() {
			var route = require('./Route.js')(_g);
			route.route();
		}

		function initialize(){
			var app=_g.app;
			app.set('view engine', 'ejs');
			app.engine('html', require('ejs').renderFile);
			app.use('/assets',_g.express.static(__dirname + '/../assets'));
			app.use(_g.bodyParser.urlencoded({
			    extended: true
			}));
			app.use(_g.bodyParser.json());
			app.use(_g.session({
				//smmsmm
			 secret: '!mmsmms!',
			 resave: false,
			 saveUninitialized: true,
			 cookie:{
			 	maxAge:24000*60*60*30,
			 },
			 store: new _g.fileStore(),
			}));
		}

		function doInBackend(){
			loadNodeModules();
			loadDividendList();
			initialize();
			loadRoute();
		}

		var publicReturn = {
			doInBackend:doInBackend,
		}
		return publicReturn;
	}

})();

