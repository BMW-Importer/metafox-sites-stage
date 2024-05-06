const { callApi, writeToFile } = require('./api_handler.js');

async function getModelsData(modelName) {
  const API_FOLDER = 'WDH_API/Models/ModelDetails/';
  const API_PATH = 'https://productdata-int1.api.bmw/pdh/categoryhub/v1.0/model/bmw+marketB4R1+bmw_rs+sr_RS/latest/';
  const apiUrl = API_PATH + modelName;
  const apiHeaders = {
    'x-api-key': `${process.env.API_TOKEN}`,
  };
  const data = await callApi(apiUrl, apiHeaders);
  const modelFileName = `${modelName}.json`;
  if (data) {
    await writeToFile(modelFileName, JSON.stringify(data, null, 2), API_FOLDER);
  }
  return data;
}

// getModelsData();

module.exports = getModelsData;
