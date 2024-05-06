const getData = require('./all_models.js');
const getModelsData = require('./model-details.js');
const getModelsRangeData = require('./model-range.js');
const getModelsTechnicalData = require('./modeltechnicaldata.js');

function getModelDetailsByModelCode(modelsArray) {
  modelsArray.forEach((modelObject) => {
    const modelName = modelObject.modelCode;
    if (modelName) {
      getModelsData(modelName);
      getModelsTechnicalData(modelName);
    }
  });
}

function getModelsRange(modelsArray) {
  modelsArray.forEach((modelObject) => {
    const modelRange = modelObject.modelRangeCode;
    if (modelRange) {
      getModelsRangeData(modelRange);
    }
  });
}

async function callWdhApi() {
  try {
    const allModelsData = await getData();
    if (allModelsData) {
      const allModelsJson = JSON.parse(allModelsData);
      const modelsArray = allModelsJson.models;
      getModelDetailsByModelCode(modelsArray);
      getModelsRange(modelsArray);
    }
  } catch (error) {
    console.error(error);
  }
}

callWdhApi();

module.exports = callWdhApi;
