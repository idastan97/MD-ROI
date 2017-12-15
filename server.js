const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// conf for auth
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

mongoose.connect('mongodb://localhost:27017/mdroi');

// server configuration
app.set('port', 3000);
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

//passport configuration
app.use(passport.initialize());
app.use(session({secret: 'some key',
    resave:  true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use('/api', require('./server/index.js'));

const isDevelopment = process.argv[2] === 'development';

if(isDevelopment){
    console.log("Dev version is starting.");
    app.use('/', express.static('public/'));
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '', 'public', 'index.html'));
    });
} else {
    console.log("Production version is starting.");
    app.use('/', express.static('build/'));
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '', 'build', 'index.html'));
    });
}

// start the server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
