const { callApi, writeFileAsync, logError } = require('./api_handler.js');
const getCosyUrl = require('./cosyimage.js');
const getModelsTechnicalData = require('./modeltechnicaldata.js');
const config = require('./config.js');

function getModelsDataJson(data, modelTechnicalData) {
  if ('effectDate' in modelTechnicalData) {
    data.model.effectDate = modelTechnicalData.effectDate;
  }
  if ('vehicles' in modelTechnicalData) {
    data.model.vehicles = modelTechnicalData.vehicles;
  }
  return data;
}

const getModelsData = async (modelName) => {
  const API_FOLDER = 'WDH_API/Models/ModelDetails/';
  const API_PATH = config.wdhModelDetailsApiUrl;
  const apiUrl = `${API_PATH}${modelName}`;
  const apiHeaders = {
    'x-api-key': process.env.API_TOKEN,
  };

  let data = await callApi(apiUrl, { headers: apiHeaders });
  const modelFileName = `${modelName}.json`;

  if (!data) {
    console.error(`No data found for model: ${modelName}`);
    return null;
  }

  try {
    const modelTechnicalData = await getModelsTechnicalData(modelName);
    if (modelTechnicalData) {
      data = getModelsDataJson(data, modelTechnicalData);
    }
    await writeFileAsync(`${API_FOLDER}${modelFileName}`, JSON.stringify(data, null, 2));
    await getCosyUrl(data);
  } catch (error) {
    await logError(`Error processing model ${modelName}: ${error.message}`);
  }
  return data;
};

getModelsData(process.env.MODEL_NAME);

module.exports = getModelsData;
