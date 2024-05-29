const fs = require('fs');
const path = require('path');
const { callApi, writeToFile } = require('./api_handler.js');

function getApiUrl(modelJson) {
  const { posiSpec } = modelJson.model;
  const configPath = path.join(__dirname, 'api_config.json');
  const cosyApiConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const cosyApiUrl = cosyApiConfig.cosyApiBaseUrl;
  const cosyHub = cosyApiConfig.cosyApiHub;
  const apiUrl = `${cosyApiUrl}${posiSpec.agCode}?hub=${cosyHub}&imagetype=webp&options=${posiSpec.options}`;
  return apiUrl;
}

async function getCosyUrl(modelJson) {
  const apiUrl = getApiUrl(modelJson);
  const xApiKey = process.env.COSY_API_TOKEN;
  const modelName = modelJson.model.modelCode;
  const apiHeaders = {
    headers: {
      'x-api-key': `${xApiKey}`,
    },
  };
  const data = await callApi(apiUrl, apiHeaders);
  const modelFileName = `${modelName}-cosy.json`;
  if (data) {
    await writeToFile(modelFileName, JSON.stringify(data, null, 2), 'WDH_API/Models/CosyImages/');
  }
  return modelName;
}

module.exports = getCosyUrl;
