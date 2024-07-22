const getData = require('./all_models.js');
const getModelsData = require('./model-details.js');
const getPreconData = require('./preconapi.js');

async function getModelDetailsByModelCode(modelsArray) {
  /* modelsArray.forEach((modelObject) => {
    const modelName = modelObject.modelCode;
    if (modelName) {
      try {
        getModelsData(modelName);
      } catch (error) {
        console.log(error);
      }
    }
  }); */
  /* await Promise.all(modelsArray.map(async (modelCodeObject) => {
    await getModelsData(modelCodeObject.modelCode);
  })); */

  await Promise.all(
    modelsArray.map(async (modelCodeObject) => {
      try {
        await getModelsData(modelCodeObject.modelCode);
        console.log(`Processed model: ${modelCodeObject.modelCode}`);
      } catch (error) {
        console.error(`Error processing model ${modelCodeObject.modelCode}:`, error);
      }
    }),
  );
}

async function callWdhApi() {
  try {
    const allModelsData = await getData();
    if (allModelsData) {
      const allModelsJson = JSON.parse(allModelsData);
      const modelsArray = allModelsJson.models;
      getModelDetailsByModelCode(modelsArray);
    }
    getPreconData();
  } catch (error) {
    console.error(error);
  }
}

callWdhApi();

module.exports = callWdhApi;
