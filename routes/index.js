var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var posts = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res, next) {

	posts.find({}, {}, function(err, posts){
		res.render('index',{
			"posts": posts,
		});		
	});
});

module.exports = router;
