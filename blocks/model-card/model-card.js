import { buildGetPlaceholder, getModelPlaceholderObject } from '../../scripts/common/wdh-placeholders.js';

async function modelPlaceholder(modelCode) {
  try {
    const endpointUrl = `/WDH_API/Models/ModelDetails/${modelCode[0]}.json`;
    const origin = window.location.host.match('author-(.*?).adobeaemcloud.com(.*?)') ? `${window.hlx.codeBasePath}` : '';
    const response = await fetch(`${origin}${endpointUrl}`);
    const responseJson = await response.json();
    buildGetPlaceholder(responseJson);
    return getModelPlaceholderObject();
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
    throw error;
  }
}

function replacePlaceholder(string, data) {
  return string.replace(/\${model(.*?)}/g, (match, expression) => {
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

function getCosyImageUrl(response) {
  const imgUrl = response.walkaround.res_1280x720.images[2].viewImage;
  return imgUrl;
}

async function getCosyImage(modelCode) {
  try {
    const endpointUrl = `/WDH_API/Models/CosyImages/${modelCode[0]}-cosy.json`;
    const origin = window.location.host.match('author-(.*?).adobeaemcloud.com(.*?)') ? `${window.hlx.codeBasePath}` : '';
    const response = await fetch(`${origin}${endpointUrl}`);
    const responseJson = await response.json();
    return getCosyImageUrl(responseJson);
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
    throw error;
  }
}

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [, placeholder] = props;
  const modelCode = ['7K11', '61FF'];
  block.textContent = '';
  modelPlaceholder(modelCode).then((wdhPlaceholderObject) => {
    const updatedPlaceholder = replacePlaceholder(placeholder.innerText, wdhPlaceholderObject);
    block.append(updatedPlaceholder);
  });
  getCosyImage(modelCode).then((cosyImageUrl) => {
    const imgTag = document.createElement('img');
    imgTag.src = cosyImageUrl;
    block.append(imgTag);
  });
}
