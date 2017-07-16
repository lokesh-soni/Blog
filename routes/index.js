var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeBlog');
var db = mongoose.connection;

var lists = mongoose.Schema({
	post_id:{
		type: String,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	body:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

var posts = module.exports = mongoose.model('posts', lists);
/* GET home page. */
router.get('/', function(req, res, next) {

	posts.find({},function(err, posts){
		res.render('index',{
			"posts": posts,
		});
	
		
	});
});

module.exports = router;
