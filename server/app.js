
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var errorHandler = require('errorhandler');
var logger = require('morgan')
var mail = require('./routes/email');
var bodyParser = require('body-parser');
var cors = require('cors');


// all environments


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.post('/api/email/send', mail.send);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;
