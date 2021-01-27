const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

require('dotenv').config();

const app = express();
const sameSite = process.env.NODE_ENV === 'production' ? 'None' : 'lax';
const secure = process.env.NODE_ENV === 'production' ? true : 'auto';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true, cookie: { secure, sameSite, path: '/' } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

module.exports = app;
