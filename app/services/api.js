/* 
PASSPORT:
	http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
	https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
	https://github.com/jaredhanson/passport-local
	http://passportjs.org/guide/profile/

EXPRESS
	http://stackoverflow.com/questions/18805054/what-is-the-proper-way-to-log-in-users-using-angular-express
	http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/
	http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543

http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local

http://danialk.github.io/blog/2013/02/23/authentication-using-passportjs/

http://codeforgeek.com/2014/09/manage-session-using-node-js-express-4/


BEST
	https://www.youtube.com/watch?v=yvviEA1pOXw
 */
var mysql = require('mysql'), 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    multer = require('multer'), 
    //session = require('express-session'), 
	cookieParser = require('cookie-parser'), 
	config = require('../configuration/config')

//var flash    = require('connect-flash');
//var morgan       = require('morgan');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer()); // for parsing multipart/form-data

//app.use(express.static('public'));

/* app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    name: 'authhw',
    proxy: true,
    resave: true,
    saveUninitialized: true
})); */

app.set('view engine', 'ejs'); // set up ejs for templating

//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html'); // set up ejs for templating		
//app.use(flash()); // use connect-flash for flash messages stored in session
// app.use(passport.initialize());
// app.use(passport.session());

  
 var connection = mysql.createConnection({
    host: '10.0.0.10',
    user: 'witnessingapp',
    password : 'Semrina77',
	port : 3306, 
    database: 'witnessing'
}); 

app.all('*',
  function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization, X-Requested-With");
	res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
	next();
  });

/* app.get('/api/me', 
	//passport.authenticate('basic', { session: false }),
	function(req, res) {
	res.json(req.user);
}); */

app.get('/api/harborlist', function(req, res) {
    var db = req.db;
    var collection = db.get('harborcollection');
    collection.find({},{},function(e,docs){
        res.render('harborlist', {
            "harborlist" : docs
        });
    });
});
app.post('/api/auth/logintest', 
	function(req, res){
		//stub good to use for testing but cannot use again because of error can't set headers after they are sent
		console.log(req.body);
		res.json(req.body);
	}); 
app.post('/api/auth/login', 
	function(req, res){
		var email = req.body.email;
		console.log(email);
		connection.query('SELECT personid, firstname, lastname, password FROM persons where email = "' + email + '" and password = "' + req.body.password + '"', req.params.id, function(err, rows, fields) {
			if (err) {
				console.error(err);
				res.statusCode = 500;
				res.send({
					result: 'error',
					err:    err.code
				});
			}
			res.send(rows);
		});

	}); 	
app.post('/api/auth/signup', function(req, res){
    //stub good to use for testing
    console.log(req.body);
    res.json(req.body);
    
    var insertPerson = 'INSERT INTO persons(firstname, lastname) values ("' + req.body.firstname + '","' +  req.body.lastname + '")';
    console.log(insertPerson);
	
    //mysql.query('insert into '+ TABLE +' (name, price) values ("' + req.body.name + '", "' + req.body.name.price + '")',

	connection.query('INSERT INTO persons(firstname, lastname, email, password, phone) values ("' + 
	                                     req.body.firstname + '","' +  req.body.lastname + '","' + req.body.email + '","' + req.body.password + '","' + req.body.phone + '")', 
										 req.params.id, function(err, rows, fields) {
			if (err) {
				console.error(err);
				res.statusCode = 500;
				res.send({
					result: 'error',
					err:    err.code
				});
			}
			res.send(rows);
		});

}); 
app.get('/api/harbors/', function(req,res){
	connection.query('SELECT harborid, harborname FROM harbors', req.params.id, function(err, rows, fields) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.send({
				result: 'error',
				err:    err.code
			});
		}
		res.send(rows);
		//connection.release();
	});
});
app.get('/api/vessels/', function(req,res){
	connection.query('SELECT vesselid, vesselname, vesselidentifier FROM vessels', req.params.id, function(err, rows, fields) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.send({
				result: 'error',
				err:    err.code
			});
		}
		res.send(rows);
		//connection.release();
	});
});
app.get('/api/persons/', function(req,res){
	connection.query('SELECT personid, firstname, lastname FROM persons', req.params.id, function(err, rows, fields) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.send({
				result: 'error',
				err:    err.code
			});
		}
		res.send(rows);
		//connection.release();
	});
});
app.get('/api/vessels/:id', function(req, res){
	connection.query('SELECT vesselid, vesselname, vesselidentifier FROM vessels where vesselid = ' + req.params.id, req.params.id, function(err, rows, fields) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.send({
				result: 'error',
				err:    err.code
			});
		}
		res.send(rows);
		//connection.release();
	});
});
app.post('/api/persons', function(req, res){
    //console.log(req.body);
    //res.json(req.body);
    
    var insertPerson = 'INSERT INTO persons(firstname, lastname) values ("' + req.body.firstname + '","' +  req.body.lastname + '")';
    console.log(insertPerson);
    //mysql.query('insert into '+ TABLE +' (name, price) values ("' + req.body.name + '", "' + req.body.name.price + '")',

connection.query('INSERT INTO persons(firstname, lastname) values ("' + req.body.firstname + '","' +  req.body.lastname + '")', req.params.id, function(err, rows, fields) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.send({
				result: 'error',
				err:    err.code
			});
		}
		res.send(rows);
	});

});
app.listen(8001);
