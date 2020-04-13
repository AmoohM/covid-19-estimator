const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${server.address().port}`);
});
