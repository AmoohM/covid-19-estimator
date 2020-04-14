const fs = require('fs');

function ResponseTimeLogger(req, res, next) {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = Math.round(elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6);

    fs.appendFile('./responseLogs/response-time-log.txt', `${req.method}\t\t${req.originalUrl}\t\t${res.statusCode}\t\t${elapsedTimeInMs}ms\n`, (err) => {
      if (err) throw err;
    });
  });

  next();
}

module.exports = ResponseTimeLogger;
