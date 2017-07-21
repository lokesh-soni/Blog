var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var multer = require('multer');
var flash = require('flash');
var fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost/nodeBlog');
var db = mongoose.connection;

router.get('/show/:id', function(req, res, next) {
	var posts = db.collection('posts');
	posts.findById(req.params.id, function(err, post){
		res.render('show',{
			"post": post

		});
	});
});

router.get('/add', function(req, res, next) {
	var categories = db.collection('categories');
	categories.find({},{}, function(err, categories){
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

	if(req.files.mainimage){
		var mainImageOriginalName = req.files.originalname;
		var mainImageName = req.files.mainimage.name;
		var mainImageMime = req.files.mainimage.mimetype;
		var mainImagePath = req.files.mainimage.path;
		var mainImageExt = req.files.mainimage.extension;
		var mainImageSize = req.files.mainimage.size;
	}
		else {
			var mainImageName = 'unnamed.png';
		}


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
		var posts = db.collection('posts');
		
		//submit
		posts.insert({
			//"post_id": post_id,
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author,
			"mainimage": mainImageName
			// "mainimage": "/uploads/"+title+"_"+author+"/"
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

router.post('/addcomment', function(req, res, next) {
    // Get form values
	var name        = req.body.name;
	var email       = req.body.email;
	var body        = req.body.body;
	var postid      = req.body.postid;
	var commentdate = new Date();

	// Form validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email is incorrectly formatted').isEmail();
	req.checkBody('body', 'Body field is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		var posts = db.collection('posts');
		posts.findById(postid, function(err, post) {
			res.render('show', {
				"errors": errors,
				"post": post
			});
		});
	} else {
		var comment = {
			"name": name,
			"email": email,
			"body": body,
			"commentdate": commentdate
		};

		var posts = db.collection('posts');

		posts.update({
				"_id": postid
			},
			{
				$push:{
					"comments": comment
				}
			},
			function(err, doc) {
				if(err) {
					throw err
				} else {
					req.flash('success', 'Comment added');
					res.location('/posts/show/' + postid);
					res.redirect('/posts/show/' + postid);
				}
			}
		);
	}
});

module.exports = router;