const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const estimateRoutes = require('./routes/routes');
const ResponseTimeLogger = require('./responseLogs/res-time-logger');

const app = express();

app.use(cors());
app.use(ResponseTimeLogger);
app.use(bodyParser.json());

app.use('/api/v1/on-covid-19', estimateRoutes);

module.exports = app;
