const config = require('./config.js');
const { callApi, writeFileAsync } = require('./api_handler.js');

const getCosyImage = async (conceptCarObject) => {
  const modelCode = conceptCarObject['Model Code'];
  const paint = conceptCarObject['Paint Code'];
  const saCodes = conceptCarObject['SA Codes'];
  const fabric = conceptCarObject.Fabric;
  const cosyApiUrl = config.cosyApiBaseUrl;
  const cosyHub = config.cosyApiHub;
  const apiUrl = `${cosyApiUrl}${modelCode}?hub=${cosyHub}&imagetype=webp&background=transparent&lightson=true&options=${fabric},${paint},${saCodes}`;
  const xApiKey = process.env.COSY_API_TOKEN;
  const COSY_IMAGE_FOLDER = 'WDH_API/Models/CosyImages/';
  const apiHeaders = {
    headers: {
      'x-api-key': `${xApiKey}`,
    },
  };
  const data = await callApi(apiUrl, apiHeaders);
  const modelFileName = `${modelCode}-cosy.json`;
  if (data) {
    await writeFileAsync(`${COSY_IMAGE_FOLDER}${modelFileName}`, JSON.stringify(data, null, 2));
  }
};

async function getConceptCarsDetails() {
  const edsHost = config.edsHostConceptCars;
  const apiHeaders = {
    'x-api-key': process.env.API_TOKEN,
  };

  const responseJson = await callApi(edsHost, { headers: apiHeaders });

  if (responseJson) {
    const conceptCars = responseJson.data;
    await Promise.all(
      conceptCars.map(async (conceptCarObject) => {
        try {
          await getCosyImage(conceptCarObject);
          console.log(`Processed model: ${conceptCarObject['Model Code']}`);
        } catch (error) {
          console.error(`Error processing model ${conceptCarObject['Model Code']}:`, error);
        }
      }),
    );
  }
}

module.exports = getConceptCarsDetails;
