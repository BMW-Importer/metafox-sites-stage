import { buildGetPlaceholder, getModelPlaceholderObject } from '../../scripts/common/wdh-placeholders.js';

async function modelPlaceholder(modelCode) {
  try {
    const endpointUrl = `/WDH_API/Models/ModelDetails/${modelCode[0]}.json`;
    const response = await fetch(endpointUrl);
    const responseJson = await response.json();
    buildGetPlaceholder(responseJson);
    return getModelPlaceholderObject();
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
    throw error;
  }
}

function replacePlaceholder(string, data) {
  return string.replace(/{model(.*?)}/g, (match, expression) => {
    const key = expression.split('.');
    let value = data;
    if (key[0] in value) {
      value = value[key[0]];
    } else {
      return match;
    }
    return value;
  });
}

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [, placeholder] = props;
  // const wdhModelPlaceholder = placeholder.match(/\$\{model.\w*\}/g);
  const modelCode = ['7K11', '61FF'];
  // const placeholder = '${model.description} this is test ${model.series}';
  modelPlaceholder(modelCode).then((wdhPlaceholderObject) => {
    const updatedPlaceholder = replacePlaceholder(placeholder, wdhPlaceholderObject);
    console.log(updatedPlaceholder);
  });
  // console.log('Placeholder value', placeholderValue);
}
