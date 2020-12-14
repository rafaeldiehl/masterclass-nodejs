/*
  O módulo `os` fornece métodos e propriedades de utilitários relacionados ao sistema operacional.
*/
const os = require('os');

/* 
  Espaço disponível -> os.freemem()
  Espaço total -> os.totalmem()
  O valor default é em bytes
  Para converter para KB é necessário dividir por 10 ^ -3
  Para converter para MB é necessário dividir por 10 ^ -6
  Para converter para GB é necessário dividir por 10 ^ -9
  Para converter para TB é necessário dividir por 10 ^ -12
*/

setInterval(() => {
  const { freemem, totalmem } = os;

  function usagePercentage(usage, total) {
    return `${100 - (parseInt((usage/total)*100))}%`;
  }

  function bytesToSizes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    for(let i = 0; i < sizes.length; i++) {
      let toSize = parseInt(bytes*(Math.pow(10, i * (-3))));
      console.log(`| ${toSize} ${sizes[i]}`)
    }
  }

  function showStats() {
    console.log('MemTotal: ');
    bytesToSizes(totalmem());
    console.log(`MemFree: `);
    bytesToSizes(freemem());
    console.log('MemPerc: ');
    console.log(`| ${percentMem(freemem(), totalmem())}`);
  }

  const stats = {
    "MemTotal": `${parseInt(totalmem()*Math.pow(10, -3))} KB`,
    "MemFree": `${parseInt(freemem()*Math.pow(10, -3))} KB`,
    "Usage": usagePercentage(freemem(), totalmem())
  }

  console.clear();
  console.log('======== CPU Stats ========');
  console.table(stats);
}, 1000);