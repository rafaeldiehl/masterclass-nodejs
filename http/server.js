/*
  O módulo `http` permite o uso do servidor e cliente HTTP
*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

http.createServer((req, res) => {

  const file = req.url === '/' ? 'index.html' : req.url
  const filePath = path.join(__dirname, 'public', file);
  const extname = path.extname(filePath);

  const allowedFileTypes = ['.html', '.css', '.js'];
  const allowed = allowedFileTypes.find(item => item == extname);

  if(!allowed) return;

  fs.readFile(
    filePath,
    (err, content) => {
        if(err) throw err;
        res.end(content);
    }
  )

  // if(url === '/contato') {
  //   return res.end('<h1>Contato</h1>');
  // }

}).listen(port, () => console.log(`Server is running on http://localhost:${port}`))