/*
  A função eventEmitter.on() permite que uma ou mais funções sejam anexadas a eventos nomeados emitidos pelo objeto. 
*/
const events = require('events');

/*
  O módulo `fs` permite interagir com o sistema de arquivos de uma forma modelada nas funções POSIX padrão.
*/
const fs = require('fs');

/* 
  O módulo `path` fornece utilitários para trabalhar com caminhos de arquivo e diretório.
*/
const path = require('path');

const Emitter = new events();

Emitter.on('log', (message) => {
  fs.appendFile(path.join(__dirname, 'log.txt'), message, (err) => {
    if(err) throw err;
  })
})

function log(message) {
  Emitter.emit('log', message);
}

module.exports = log;