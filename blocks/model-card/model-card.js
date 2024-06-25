import { fetchSetPlaceholderObject, fetchModelPlaceholderObject } from '../../scripts/common/wdh-placeholders.js';
import {
  buildContext, getCosyImage, getCosyImageUrl, replacePlaceholder, getResolutionKey
} from '../../scripts/common/wdh-util.js';

export default function decorate(block) {
  const imgTag = document.createElement('img');
  const props = [...block.children].map((row) => row.firstElementChild);
  const [, placeholder] = props;
  const modelCodeArray = ['7K11'];
 //  const modelCodeArray = ['7K11', '61CM', '7K11'];
  block.textContent = '';
  modelCodeArray.forEach((agCode) => {
    getCosyImage(agCode).then((responseJson) => {
      const screenWidth = window.innerWidth;
      const resolutionKey = getResolutionKey(screenWidth);  
      const cosyImageUrl = getCosyImageUrl(responseJson, resolutionKey, 20);
      const imgTag = document.createElement('img');
      imgTag.src = cosyImageUrl;
      block.append(imgTag);
    });

  });

  buildContext(modelCodeArray).then(() => {
    // console.log(wdhSetPlaceholder);
    const wdhModelPlaceholder = fetchModelPlaceholderObject();
    const wdhSetPlaceholder = fetchSetPlaceholderObject();
    const wdhTechPlaceholder = fetchTechDataPlaceholderObject();
    const modelRegex = /\{model(.*?)}/g;
    const textContent = placeholder.innerText;
    let updatedPlaceholder = replacePlaceholder(textContent, wdhModelPlaceholder, modelRegex);
    const setRegex = /\{set(.*?)}/g;
    updatedPlaceholder = replacePlaceholder(updatedPlaceholder, wdhSetPlaceholder, setRegex);

    // technicalData

    const techRegex = /\{tech(.*?)}/g;

    updatedPlaceholder = replacePlaceholder(updatedPlaceholder, wdhSetPlaceholder, techRegex);

    console.log(wdhSetPlaceholder);
    block.append(updatedPlaceholder);
  });
  const a = fetchSetPlaceholderObject();
  console.log(a);
}
