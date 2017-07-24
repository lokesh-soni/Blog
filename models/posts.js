var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var lists = new Schema({
	title:{
		type: String,
		required: true
	},
	author_name:{
		type: String
	},
	author_username:{
		type: String
	},
	
	category:{
		type: String
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

module.exports.getpostsByAuthor = function(author, callback){
	var query = {author: author};
	posts.findOne(query, callback);
}

module.exports.getpostsById = function(id, callback){
	var query = {_id: req.params.id};
	posts.findById(query, callback);
}

// module.exports.getposts = function (lists, callback){
// 	var qq = {
// 		title: title,
// 		category: category,
// 		body: body,
// 		date: date,
// 		author: author,
// 		mainimage: mainimage,
// 	};
// 	posts.find(qq, callback);
// }

module.exports.createposts = function (post, callback){
	post.insert(callback);
}
