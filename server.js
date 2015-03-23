var express = require('express');
var app = express();                                 // create our app using express
var mongoose = require('mongoose');                  // mongoose for mongodb
var port = process.env.port || 1337;                 //setting up the port
var database = require('./Public/Data/database.js'); // load the config for the database
var morgan = require('morgan');                      // log requests to the console (express4)
var bodyParser = require('body-parser');             // pull information from HTML POST (express4)
var methodOverride = require('method-override');     // simulate DELETE and PUT (express4)
var http = require("http").createServer(app);        // set up the HTTP server using Express
var io = require('socket.io').listen(http);          // Set up socket server
// configuration ================================================================================
mongoose.connect(database.url);                                 // connect to mongoDB database on local drive
app.use(express.static(__dirname + '/Public'));                 // set the static files location /public
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// security=====================================================================================
var security = require('./Security/security.js');// security file

//Check database connection =====================================================================
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Successfully Connected to MongoDB");
});

// load the routes
require('./Public/Scripts/routes.js')(app);
//routes.addAPIRouter(app, mongoose, stormpath);

// listen (start app with node server.js) ========================================================
app.listen(port);
console.log("Kevin's Health Emporium");
console.log("App listening on port " + port);
// return error for invalid url ==================================================================
app.use(function (req, res, next) {
    res.status(404);
    res.json({ error: 'Oh my god no...... Invalid URL' });
});

exports = module.exports = app;

//Messaging App