const { readFile, writeFile } = require('fs').promises;

const productApi = (path, prop) => ({
  async get () {
    const dataString = await readFile(path);
    return JSON.parse(dataString)[prop];
  },

  async save (data) {
    await writeFile(path, JSON.stringify({ [prop]: data }));
  }
})

module.exports = productApi;