import { getPreConApiResponse, getPreConCosyImage } from '../../scripts/common/wdh-util.js';

export default async function decorate(block) {
  const precon = [...block.children];

  for (const preconData of precon) {
    let preConModelResponse;
    const [wdhContext, linkTab] = preconData.children;
    const splitPrecoData = wdhContext.textContent.trim().split(',');
    const selectedPreConId = splitPrecoData[1]?.trim();   // authored selected PRECON ID
    const selectedModelCode = splitPrecoData[2]?.trim();  // authored selected modelCode
    try {
      if ( selectedPreConId ){ 
        preConModelResponse = await getPreConApiResponse(selectedPreConId);  // calling PRECon API
        console.log('preConModel response', preConModelResponse);
    }
    } catch (error) {
      console.error(error);
    }
    if (preConModelResponse) {
        let matchedKey;
        for (let key in preConModelResponse.responseJson) {
          if (preConModelResponse.responseJson[key].id === selectedModelCode);
          matchedKey = preConModelResponse.responseJson[key].modelCode;
          break;
        }        
       const preConCosyImage = await getPreConCosyImage(matchedKey); // Calling PRECON Cosy Image
       console.log('precon Cosy Image', preConCosyImage);
      }
    }    
}

