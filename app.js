const express = require('express');
const bodyParser = require('body-parser');
const estimateRoutes = require('./routes/routes');
const ResponseTimeLogger = require('./logs/res-time-logger');

const app = express();

app.use(ResponseTimeLogger);
app.use(bodyParser.json());
app.use('/api/v1/on-covid-19', estimateRoutes);

module.exports = app;
