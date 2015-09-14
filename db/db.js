var mongoose = require('mongoose');

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
})

var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	username:String,
	password:String
});

var EventsOppColSchema = new Schema({
	page:String,
	subpageOf:String,
	title:String,
	maindesc:String,
	subdesc:[{subtitle:String,subdescription:String,subimage:String}],
	imagelink:[{imagedesc:{title:String,left:String,right:String,desc:String,stype:String,clink:String},link:String}],
	bannerimage:String,
	bannerimage2:String
});

var MainSchema = new Schema({
	news:[String],
	col1:{title:String,desc:String,imagelink:String,link:String},
	col2:{title:String,desc:String,imagelink:String,link:String},
	col3:{title:String,desc:String,imagelink:String,link:String},
	about:String,
	mission:[String],
	vision:String
});

var CalenderSchema = new Schema({
	events:[{when:String,desc:String}]
});

var MembersSchema = new Schema({
	info:{name:String,batch:Number,post:String,priority:Number,pic:String,contact:{email:String,number:Number}}
});

var GallerySchema = new Schema({
	pics:{link:String,title:String,about:{album:String,desc:String,date:String}}
});

var RecentPostsSchema = new Schema({
	posts:[String]
});

var EventsOppCol = mongoose.model( 'EventsOppColSchema', EventsOppColSchema );
var MainSchema = mongoose.model('MainSchema',MainSchema);
var Calender = mongoose.model('CalenderSchema',CalenderSchema);
var Members = mongoose.model('MembersSchema',MembersSchema);
var Gallery = mongoose.model('GallerySchema',GallerySchema);
var RecentPosts = mongoose.model('RecentPostsSchema',RecentPostsSchema);
var Users = mongoose.model('UserSchema',UserSchema);

mongoose.connect( "mongodb://localhost/asce" , function (err) {
        if(err) console.log(err);
    });

module.exports = {
    EventsOppCol: EventsOppCol,
    MainSchema: MainSchema,
    Calender: Calender,
    Members: Members,
    Gallery: Gallery,
    RecentPosts:RecentPosts,
    Users: Users
};
