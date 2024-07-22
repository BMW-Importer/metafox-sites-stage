const { callApi, writeToFile } = require('./api_handler.js');

const API_FOLDER = 'WDH_API/All_Models/'; // Change for each API module

async function getData() {
  console.log('Inside getData method for All Models');
  const apiHeaders = {
    'x-api-key': `${process.env.API_TOKEN}`,
  };
  const data = await callApi('https://productdata.api.bmw/pdh/categoryhub/v1.0/all/bmw+marketB4R1+bmw_rs+sr_RS/latest', apiHeaders);
  if (data) {
    await writeToFile('all_models.json', JSON.stringify(data, null, 2), API_FOLDER);
  }
  return JSON.stringify(data);
}

module.exports = getData;
