var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

// set up a mongoose model
module.exports = mongoose.model('Post', new Schema({
	title: String,
	content: String
}).plugin(URLSlugs('title')));