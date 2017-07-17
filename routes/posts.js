var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var flash = require('flash');

mongoose.connect('mongodb://localhost/nodeBlog');
var db = mongoose.connection;



router.get('/add', function(req, res, next) {
	res.render('addpost',{
		"title": "Add post",
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
		var mainImageOriginalName = req.files.mainimage.originalname;
		var mainImageName         = req.files.mainimage.name;
		var mainImageMime         = req.files.mainimage.mimetype;
		var mainImagePath         = req.files.mainimage.path;
		var mainImageExt          = req.files.mainimage.extension;
		var mainImageSize         = req.files.mainimage.size;
	} else {

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