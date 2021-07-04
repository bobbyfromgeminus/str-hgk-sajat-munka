const os = require('os');

// Operációs rendszer információ - win32
console.log('Platform:', os.platform());

// Architektúra - x64
console.log('Architect:', os.arch());

// Op. rendszer verziószáma - Windows 10 Enterprise
console.log('OS version:', os.version());

// OS Build number - 10.0.19042
console.log('OS Build number:', os.release());

// Processzorok - AMD Ryzen 7 3700X 8-Core Processor
console.log('Processors:', os.cpus());

// Processzor model - AMD Ryzen 7 3700X 8-Core Processor
console.log('Processors:', os.cpus()[0].model);

// Teljes memória byteban
console.log('Total memory size:', os.totalmem());

// Teljes memória GB-ban
console.log('Total memory size:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');

// Szabad memória GB-ban
console.log('Free memory size:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');

// Username
console.log('Username:', os.userInfo());
console.log('Username:', os.userInfo().username);

// IP cím
console.log('IP address:', os.networkInterfaces());
console.log('IP address:', os.networkInterfaces().Ethernet[1].address);