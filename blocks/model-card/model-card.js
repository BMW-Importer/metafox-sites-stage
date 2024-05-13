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

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [, placeholder] = props;
  const wdhModelPlaceholder = placeholder.match(/\$\{model.\w*\}/g);
  if (wdhModelPlaceholder) {
    const modelCode = ['7K11', '61FF'];
    let placeholderValue = '';
    modelPlaceholder(modelCode).then((wdhPlaceholderObject) => {
      placeholderValue = wdhPlaceholderObject[wdhModelPlaceholder[0]];
      console.log('Placeholder Value', placeholderValue);
    });
  }
  // console.log('Placeholder value', placeholderValue);
}
