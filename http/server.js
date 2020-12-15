/*
  O módulo `http` permite o uso do servidor e cliente HTTP
*/
const http = require('http');
const port = 5000;

http.createServer((req, res) => {

  let { url } = req;

  if(url === '/')
    return res.end('<h1>Home</h1>');

  if(url === '/contato')
    return res.end('<h1>Contato</h1>');

}).listen(port, () => console.log(`Server is running on http://localhost:${port}`))