import {
  getPreConApiResponse, getPreConCosyImage, getResolutionKey, getCosyImageUrl,
} from '../../scripts/common/wdh-util.js';


function configureCTA(selectedModel, currentVechileData) {
 let selectedModelValue;
 if (selectedModel === 'Model Range'){
  return selectedModelValue = `https://configure.bmw.rs/sr_RS/configure/${currentVechileData.modelRangeCode}`
 }
 if (selectedModel === 'Model Code') {
  return selectedModelValue = `https://configure.bmw.rs/sr_RS/configure/${currentVechileData.modelRangeCode}/${currentVechileData.modelCode}`
 }
 if (selectedModel === 'All Optiopns') {
  return selectedModelValue = `https://configure.bmw.rs/sr_RS/configure/${currentVechileData.modelRangeCode}/${currentVechileData.modelCode}/${currentVechileData.fabric}/${currentVechileData.paint}/${currentVechileData.options}`
 }
 return selectedModelValue;

}
export default async function decorate(block) {
  let headLineDom;
  const precon = [...block.children];
  let preConImageDOM;
  for (const preconData of precon) {
    let preConModelResponse;
    let preConCosyImage;
    let preConHeadLine;
    let optionsValue;
    let titleName;
    let modeRangeCode;
    let configureLink;
    let configureCTADom;

    const [wdhContext, linkTab] = preconData.children;
    const splitPreconData = wdhContext.querySelectorAll('p')[0]?.textContent.split(',') || '';
    const selctedModelData = wdhContext.querySelectorAll('p')[1]?.textContent || '';
    const selectedModelRange = splitPreconData[1]?.trim() || ''; // authored selected ModelRange G21
    const selectedPreConId = splitPreconData[2]?.trim() || ''; // authored selected PRECODN-ID
    preconData.removeChild(wdhContext);
    preconData.removeChild(linkTab);
    try {
      if (selectedModelRange) {
        preConModelResponse = await getPreConApiResponse(selectedModelRange); // calling PRECon API
        console.log('preConModel response', preConModelResponse);
      }
    } catch (error) {
      console.error(error);
    }
    if (preConModelResponse) {
      let preConModeCode;
      for (let key in preConModelResponse.responseJson) {
        if (preConModelResponse.responseJson[key].id === selectedPreConId);
        preConModeCode = preConModelResponse.responseJson[key]?.modelCode; // MODEL-CODE
        preConHeadLine = preConModelResponse.responseJson[key]?.headline; // Show the headline below cosy Image
        optionsValue = preConModelResponse.responseJson[key]?.options; //
        configureLink = configureCTA(selctedModelData, preConModelResponse.responseJson[key]);
        break;
      }
      const optionsCount = optionsValue.split(',').length;
      preConCosyImage = await getPreConCosyImage(preConModeCode); // Calling PRECON Cosy Image
      headLineDom = document.createElement('div');
      headLineDom.classList.add('headerline-wrapper');
      headLineDom.textContent = `HeadLine test: ${preConHeadLine}, ${optionsCount}`;
      configureCTADom = document.createElement('a');
      configureCTADom.classList.add('button');
      configureCTADom.href = configureLink;
      configureCTADom.textContent = "CLICK ME";
      headLineDom.append(configureCTADom);
    }
    if (preConCosyImage) { // cosy image to show for Pre-Con
      const screenWidth = window.innerWidth;
      const resolutionKey = getResolutionKey(screenWidth);
      const createPictureTag = (quality) => {
        const pictureTag = document.createElement('picture');
        const resolutions = [1025, 768];
        resolutions.forEach((resolution) => {
          const sourceTag = document.createElement('source');
          sourceTag.srcset = getCosyImageUrl(
            preConCosyImage,
            getResolutionKey(resolution),
            resolution === 768 ? 30 : quality,
          );
          sourceTag.media = `(min-width: ${resolution}px)`;
          pictureTag.appendChild(sourceTag);
        });

        // Fallback img tag
        const imgTag = document.createElement('img');
        imgTag.src = getCosyImageUrl(preConCosyImage, resolutionKey, 40);
        imgTag.alt = 'pre con Cosy Image';
        pictureTag.appendChild(imgTag);
        return pictureTag;
      };
      preConImageDOM = createPictureTag(40);
      block.append(preConImageDOM);
      block.append(headLineDom);
    }
  }
}
