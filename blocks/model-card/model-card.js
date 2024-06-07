import {
  buildGetPlaceholder, buildSetPlaceholder, fetchSetPlaceholderObject, getModelPlaceholderObject,
} from '../../scripts/common/wdh-placeholders.js';

if (!window.modelDataMap) {
  window.modelDataMap = new Map();
}

async function getApiResponse(modelCode) {
  try {
    const endpointUrl = `/WDH_API/Models/ModelDetails/${modelCode}.json`;
    const origin = window.location.host.match('author-(.*?).adobeaemcloud.com(.*?)') ? `${window.hlx.codeBasePath}` : '';
    const response = await fetch(`${origin}${endpointUrl}`);
    const responseJson = await response.json();
    if (responseJson) {
      window.modelDataMap.set(modelCode, responseJson);
    }
    return { modelCode, responseJson };
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
    throw error;
  }
}

async function fetchAllModels(modelCodes) {
  const modelCodesArray = modelCodes.filter((modelCode) => !window.modelDataMap.has(modelCode));
  const promises = modelCodesArray.map(getApiResponse);
  const results = await Promise.allSettled(promises);
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      window.modelDataMap.set(result.value.modelCode, result.value.responseJson);
    } else {
      console.error('API call failed while fetching WDH data');
    }
  });
  const response = modelCodes.map((modelCode) => {
    if (window.modelDataMap.has(modelCode)) {
      return window.modelDataMap.get(modelCode);
    }
    return { modelCode, error: 'Model Code data not found' };
  });
  return response;
}

export async function buildContext(modelCodesArray) {
  try {
    await fetchAllModels(modelCodesArray).then((response) => {
      buildSetPlaceholder(response);
      buildGetPlaceholder(response[0]);
      const modelPlaceholder = getModelPlaceholderObject();
      const setPlaceholder = fetchSetPlaceholderObject();
      return { modelPlaceholder, setPlaceholder };
    });
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
    throw error;
  }
  // return getModelPlaceholderObject();
}

function replacePlaceholder(string, data, regex) {
  return string.replace(regex, (match, expression) => {
    const key = expression.split('.');
    let value = data;
    if (key[1] in value) {
      value = value[key[1]];
    } else {
      return match;
    }
    return value;
  });
}

function getCosyImageUrl(response, resolution, angle) {
  const imagesObject = response.walkaround[resolution].images;
  const imgUrl = imagesObject.find((img) => img.angle === angle && img.viewImage !== undefined);
  return imgUrl.viewImage;
}

async function getCosyImage(modelCode) {
  try {
    const endpointUrl = `/WDH_API/Models/CosyImages/${modelCode}-cosy.json`;
    const origin = window.location.host.match('author-(.*?).adobeaemcloud.com(.*?)') ? `${window.hlx.codeBasePath}` : '';
    const response = await fetch(`${origin}${endpointUrl}`);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
    throw error;
  }
}

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [, placeholder] = props;
  const modelCodeArray = ['7K11', '61CM'];
  block.textContent = '';
  buildContext(modelCodeArray).then(() => {
    // console.log(wdhSetPlaceholder);
    const wdhModelPlaceholder = getModelPlaceholderObject();
    const wdhSetPlaceholder = fetchSetPlaceholderObject();
    const modelRegex = /\${model(.*?)}/g;
    const textContent = placeholder.innerText;
    let updatedPlaceholder = replacePlaceholder(textContent, wdhModelPlaceholder, modelRegex);
    const setRegex = /\${set(.*?)}/g;
    updatedPlaceholder = replacePlaceholder(updatedPlaceholder, wdhSetPlaceholder, setRegex);
    console.log(wdhSetPlaceholder);
    block.append(updatedPlaceholder);
  });
  modelCodeArray.forEach((agCode) => {
    getCosyImage(agCode).then((responseJson) => {
      const cosyImageUrl = getCosyImageUrl(responseJson, 'res_1280x720', 20);
      const imgTag = document.createElement('img');
      imgTag.src = cosyImageUrl;
      block.append(imgTag);
    });
    getCosyImage(agCode).then((responseJson) => {
      const cosyImageUrlNew = getCosyImageUrl(responseJson, 'res_640x360', 90);
      const imgTag = document.createElement('img');
      imgTag.src = cosyImageUrlNew;
      block.append(imgTag);
    });
  });
  const a = fetchSetPlaceholderObject();
  console.log(a);
}
