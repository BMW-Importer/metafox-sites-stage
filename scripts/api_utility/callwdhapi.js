const getData = require('./all_models.js');
const getModelsData = require('./model-details.js');
const getPreconData = require('./preconapi.js');
const getConceptCarsDetails = require('./concept-cars.js');

async function getModelDetailsByModelCode(modelsArray) {
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
    await getConceptCarsDetails();
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
