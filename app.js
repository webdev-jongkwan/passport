const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const config = require('./config/config');

mongoose.connect(config.db, function () {
    console.log(config.db + ' connected.');
});
mongoose.Promise = global.Promise;

let app = express();
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.engine('html', require('ejs').renderFile);
app.use(session({
    secret: 'sessionsecret',
    resave: false,
    saveUninitialized: true,
    // store:
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./server/routes'));


app.listen(3003, function () {
    console.log('3003 port on')
});
