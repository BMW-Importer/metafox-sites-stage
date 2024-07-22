// eslint-disable-next-line import/no-unresolved
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);
// const path = require('path');

/* const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname);
  return true;
}; */

const writeToFile = async (modelName, data, apiFolder) => {
  try {
    const filePath = apiFolder + modelName;
    // ensureDirectoryExistence(filePath);
    writeFileAsync(filePath, data);
  } catch (error) {
    console.error(`Error writing to file ${modelName}:`, error);
  }
};

const callApi = async (url, options = {}) => {
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error) {
    await writeToFile('wdh_error.txt', `\n${error.message}`, 'WDH_API/');
    return null;
  }
};

module.exports = { callApi, writeToFile };
