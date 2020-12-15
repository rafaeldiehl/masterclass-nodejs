/*
  O módulo `http` permite o uso do servidor e cliente HTTP
*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

http.createServer((req, res) => {

  let { url } = req;

  if(url === '/') {
    fs.readFile(
      path.join(__dirname, 'public', 'index.html'),
      (err, content) => {
        if(err) throw err;

        res.end(content);
      }
    );
  }

  if(url === '/contato') {
    return res.end('<h1>Contato</h1>');
  }

}).listen(port, () => console.log(`Server is running on http://localhost:${port}`))