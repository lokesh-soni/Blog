var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var multer = require('multer');
var flash = require('flash');
var fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost/nodeBlog');
var db = mongoose.connection;

var lists = mongoose.Schema({
	
	title:{
		type: String,
		required: true
	}
});

var categories = module.exports = mongoose.model('categories', lists);

var posts = db.collection('posts');

router.get('/show/:id', function(req, res, next) {
	var posts = db.collection('posts');
	var ids = req.param._id;
	console.log(ids);
	posts.find(ids, function(err, posts){
		res.render('show',{
			"posts": posts

		});
	});
});
router.get('/add', function(req, res, next) {

	categories.find({},function(err, categories){
		res.render('addpost',{
			"categories": categories
		});		
	});
});

router.post('/add', function(req, res, next){
	//Get form Values
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body.author;
	var date = new Date();

	// Form Validation
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('body', 'Body is required');
	// Check Errors
	var errors = req.validationErrors();

	if(errors){
		res.render('addpost',{
			"errors": errors,
			"title":title,
			"body": body
		});
	} else {
		//submit
		posts.insert({
			//"post_id": post_id,
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author
		}, function(err, post){
			if(err){
				res.send('Errors ho gaiiiillll ba re');
			}
			else {
				req.flash('success', 'Post submitted');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});
module.exports = router;