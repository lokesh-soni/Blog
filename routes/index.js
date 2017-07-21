var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeBlog');
var db = mongoose.connection;
	var db = req.db;
	var posts = db.collection('posts');
/* GET home page. */
router.get('/', function(req, res, next) {

	posts.find({}, {}, function(err, posts){
		res.render('index',{
			"posts": posts,
		});		
	});
});

module.exports = router;
