const { callApi, writeFileAsync } = require('./api_handler.js');
const config = require('./config.js');

const API_FOLDER = 'WDH_API/All_Models/';

async function getData() {
  const wdhApiUrl = config.wdhAllModelApiUrl;
  console.log('Inside getData method for All Models');
  const apiHeaders = {
    'x-api-key': `${process.env.API_TOKEN}`,
  };
  const data = await callApi(wdhApiUrl, apiHeaders);
  if (data) {
    await writeFileAsync(`${API_FOLDER}all_models.json`, JSON.stringify(data, null, 2));
  }
  return JSON.stringify(data);
}

module.exports = getData;
