const http = require('http');
const data = require('./urls.json');

const port = 3000;

http.createServer((req, res) => {
  res.end(JSON.stringify(data));
}).listen(port, () => console.log(`API is running on http://localhost:${port}`))