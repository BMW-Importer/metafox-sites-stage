import {
  getPreConApiResponse, getPreConCosyImage, getResolutionKey, getCosyImageUrl,
} from '../../scripts/common/wdh-util.js';

function generatePrecon(wdhContext, linkTab, preconData) {
  const preTitle = document.createElement('div');
  preTitle.classList.add('precon-title');

  const preCtaWrap = document.querySelector('.precon-link');

  const preconDesWrapper = document.createElement('div');
  preconDesWrapper.classList.add('precon-description');

  const preconAnchorElm = linkTab?.querySelector('a') || '';

  preCtaWrap.append(preconAnchorElm);
  preconData.append(wdhContext, preCtaWrap)
}

async function generateCosyImage(headLineDom, wdhContext, imageDomContainer) {

  let preConModelResponse;
  let preConCosyImage;
  let preConHeadLine;
  let optionsValue;
  let titleName;

  let preConImageDOM;

  const splitPreconData = wdhContext.textContent.trim().split(',');
  const selectedModelRange = splitPreconData[1]?.trim(); // authored selected ModelRange G21
  const selectedPreConId = splitPreconData[2]?.trim(); // authored selected PRECODN-ID
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
      preConHeadLine = preConModelResponse.responseJson[key]?.headline;  // Show the headline below cosy Image
      optionsValue = preConModelResponse.responseJson[key]?.options; // options count
      titleName = preConModelResponse.responseJson[key]?.name; // Tile Name shop the look
      break;
    }
    const optionsCount = optionsValue.split(',').length;
    preConCosyImage = await getPreConCosyImage(preConModeCode); // Calling PRECON Cosy Image
    headLineDom = document.createElement('div');
    headLineDom.classList.add('headerline-wrapper');
    headLineDom.textContent = `HeadLine test: ${titleName}, ${preConHeadLine}, ${optionsCount}`
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
    imageDomContainer.append(preConImageDOM, preConHeadLine);
  }
}


export default async function decorate(block) {
  let headLineDom;
  const preconLeftWrapper = document.createElement('div');
  preconLeftWrapper.classList.add('precon-wrapper-lft-area');

  const contentData = document.createElement('div');
  contentData.classList.add('precon-content-data');

  const imageDomContainer = document.createElement('div');
  imageDomContainer.classList.add('precon-image-container');

  const preconRightWrapper = document.createElement('div');
  preconRightWrapper.classList.add('precon-wrapper-rth-area');

  const precon = [...block.children];
  for (const preconData of precon) {
    preconData.classList.add('precon-card');
    const [wdhContext, linkTab] = preconData.children;
    preconData.children[0].classList.add('precon-wdh');
    preconData.children[1].classList.add('precon-link');

    generateCosyImage(headLineDom, wdhContext, imageDomContainer);
    generatePrecon(wdhContext, linkTab, preconData);
    contentData.append(preconData);
  }
  block.textContent = '';
  block.append(imageDomContainer, preconLeftWrapper, preconRightWrapper, contentData );
}