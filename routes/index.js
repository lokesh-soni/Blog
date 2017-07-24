var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var posts = require('../models/posts');
var categories = require('../models/categories');
var jsdom = require("jsdom");

/* GET home page. */
router.get('/', function(req, res, next) {

	posts.find({}, {}, function(err, posts){
		res.render('index',{
			"posts": posts,
		});		
	});
});
router.get('/:author_username', function(req, res, next) {
	console.log(req.params.author_username);
	posts.find({author_username:req.params.author_username},{}, function(err, posts){
		//console.log(post);
		res.render('index',{
			"posts": posts
		});
	});
});
router.get('/:categories', function(req, res, next) {
	console.log(req.params.categories);
	posts.find({categories:req.params.categories},{}, function(err, categories){
		//console.log(post);
		res.render('index',{
			"posts": categories
		});
	});
});

// Window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
// 	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
// 		document.getElementById("myBtn").style.display = "block";
// 	} else {
// 		document.getElementById("myBtn").style.display = "none";
// 	}
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//     document.body.scrollTop = 0; // For Chrome, Safari and Opera 
//     document.documentElement.scrollTop = 0; // For IE and Firefox
// }


module.exports = router;
