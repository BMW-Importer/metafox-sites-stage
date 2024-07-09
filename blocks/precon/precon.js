import {
  getPreConApiResponse, getPreConCosyImage, getResolutionKey, getCosyImageUrl,
} from '../../scripts/common/wdh-util.js';

export default async function decorate(block) {
  let headLineDom;
  const precon = [...block.children];
  let preConImageDOM;
  for (const preconData of precon) {
    let preConModelResponse;
    let preConCosyImage;
    let preConHeadLine;
    let modelThumbnailElement;
    const [wdhContext, linkTab] = preconData.children;
    const splitPrecoData = wdhContext.textContent.trim().split(',');
    const selectedModelRange = splitPrecoData[1]?.trim(); // authored selected ModelRange G21
    const selectedPreConId = splitPrecoData[2]?.trim(); // authored selected PRECODN-ID
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
        preConModeCode = preConModelResponse.responseJson[key].modelCode; // MODEL-CODE
        preConHeadLine = preConModelResponse.responseJson[key].headline;  // Show the headline below cosy Image
        break;
      }        
      preConCosyImage = await getPreConCosyImage(preConModeCode); // Calling PRECON Cosy Image
      headLineDom = document.createElement('div');
      headLineDom.classList.add('headerline-wrapper');
      headLineDom.textContent = `HeadLine ${preConHeadLine}`
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
        imgTag.alt = 'Cosy Image';
        pictureTag.appendChild(imgTag);
        return pictureTag;
      };
      preConImageDOM = createPictureTag(40);      
    }
    block.textContent = '';
    block.appendChild(preConImageDOM);
    block.append(headLineDom);
  }    
}

