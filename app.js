const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const gpsRoutes = require('./routes/gps')
const orderRoutes = require('./routes/order')
const stopsRoutes = require('./routes/stops')

const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/gps', gpsRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/stops', stopsRoutes);

module.exports = app;