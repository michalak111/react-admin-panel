// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors = require('cors');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var Post   = require('./app/models/post');
// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8060; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
    next();
});

app.set('etag', false);
// =================================================================
// routes ==========================================================
// =================================================================
app.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({ 
		name: '',
		password: '',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

// basic route (http://localhost:8060)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8060/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {
	// find the user
	User.findOne({
		name: req.body.username
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json(400, { success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json(400, { success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);

app.get('/post', function (req, res) {
	Post.find({}, function (err, posts) {
        var postsMap = [];

        posts.forEach(function(post) {
            postsMap.push({id: post._id, title: post.title, content: post.content})
        });
        res.setHeader('Content-Range', posts.length);
        res.send(postsMap);
    });
});

app.get('/post/:id', function (req, res) {
    Post.findById({_id: req.params.id}, function (err, post) {
        res.send(post);
    });
});

app.post('/post', apiRoutes, function (req, res) {
    // create a sample post
    var post = new Post({
        title: req.body.content,
        content: req.body.title
    });
    post.save(function(err) {
        if (err) throw err;

        res.json({ success: true });
    });
});

app.put('/post/:id', apiRoutes, function (req, res) {
	if (typeof req.body.content === 'undefined' || typeof req.body.title === 'undefined') {
		res.send(400, {message: 'no content provided'})
	} else {
        Post.update({'_id': req.params.id}, {title: req.body.title, content: req.body.content}, function(err, post){
            if (err) return res.send(500, { error: err });
            return res.send({message: 'success update', post:post});
        });
	}
});

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
