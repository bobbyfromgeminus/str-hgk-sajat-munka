const { mkdir, writeFile } = require('fs').promises;

const createFolders = async (folders) => {
  await folders.map( folder => mkdir(folder) );
}

const createFiles = async (files) => {
  await files.map( file => writeFile(file, '') );
}

module.exports = {
  createFolders, 
  createFiles
};
