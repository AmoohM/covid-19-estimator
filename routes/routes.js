const express = require('express');
const builder = require('xmlbuilder');
const fs = require('fs');
const covid19Estimator = require('../src/estimator');

const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  const estimate = covid19Estimator(data);
  res.status(200).json(estimate);
});

router.post('/json', (req, res) => {
  const data = req.body;
  const estimate = covid19Estimator(data);
  res.status(200).json(estimate);
});

router.post('/xml', (req, res) => {
  const data = req.body;
  const estimate = covid19Estimator(data);
  const xml = builder.create(estimate, { encoding: 'UTF-8' }).end({ pretty: true });
  res.type('xml');
  res.status(200).send(xml);
});

router.get('/logs', (req, res) => {
  fs.readFile('./logs/response-time-log.txt', (err, logs) => {
    res.type('text');
    res.send(logs);
  });
});

module.exports = router;
