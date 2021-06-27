const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');
const path = require('path');

const Logger = require('./utils');
const logger = new Logger();

// Transzformáló osztály
class TitleCaseStream extends Transform {
    constructor() {
        super();
    }

    _transform(chunk, enc, done) {  // chunk - darabokat kapunk Bufferben, ami bájtokat tartalmaz
        const output = chunk.toString('utf8').split(' ')
            .map(element => {
                return `${element[0].toUpperCase()}${element.slice(1)}`;
            })
            .join(' ');
        this.push(output);
        done();
    };
}

const readStream = createReadStream(
    path.join(__dirname, 'example.txt'),
    {
        encoding: 'utf8',
        highWaterMark: 1024
    }
);

const writeStream = createWriteStream(
    path.join(__dirname, 'exampleCopy.txt'),
    'utf8'
);

writeStream.on('finish', (err) => {
    if (err) {
        logger.error('Transform failed')};
    logger.success('File transform successful');
});

readStream.pipe(new TitleCaseStream()).pipe(writeStream);