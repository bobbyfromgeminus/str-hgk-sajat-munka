const { readFile } = require('fs').promises;

const readFileWrapper =  async (file, options = {}) => {
    try {
        const result = await readFile(file, options); // nem kell callbacket megadni!
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = Object.freeze({
    readFileWrapper
});