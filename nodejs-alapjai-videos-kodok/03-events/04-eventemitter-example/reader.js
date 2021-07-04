const { readFile } = require('fs').promises;

// Factory függvény
const reader = (eventEmitter) => {

    const readContent = async (file) => {
        console.log('Reading process started. \nFile:', file);
        try {
            const data = await readFile(file, { encoding: 'utf-8' });
            console.log('Reading process done succesfuly.');
            eventEmitter.emit('print', data);
        }
        catch {
            eventEmitter.emit('error', error);
        }
    }

    const printContent = (content) => {
        console.log('Content: \n', content);
        eventEmitter.emit('close');
    }

    const errorHandler = (err) => {
        console.log('An error occurred: ', err.message);
    }

    const close = () => {
        console.log('Printing process done. App closed.');
    }

    return {
        readContent,
        printContent, 
        errorHandler, 
        close
    }
}

module.exports = reader;