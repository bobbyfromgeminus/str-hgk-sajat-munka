const { readFileLog, readFileSyncLog } = require('./utils');

readFileSyncLog('./a_ket_torony.txt', { encoding: 'utf-8' });
readFileLog('./a_ket_torony.txt', { encoding: 'utf-8' });