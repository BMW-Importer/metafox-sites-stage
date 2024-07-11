import {
  getPreConApiResponse, getPreConCosyImage, getResolutionKey, getCosyImageUrl,
} from '../../scripts/common/wdh-util.js';


let iconClicked = false;

function updateCarousel(content, currentIndex, gap) {
  const itemWidth = (content.children[currentIndex].offsetWidth);
  const offset = -(currentIndex * (itemWidth));
  content.style.transform = `translate3d(${offset}px, 0px, 0px)`;
  content.style.transitionDuration = '750ms';
  content.style.transitionDelay = '100ms';

  const cards = content.children;
  for (let i = 0; i < cards.length; i++) {
    if (i === currentIndex) {
      cards[i].classList.add('active');
      cards[i].classList.remove('not-active');
    } else {
      cards[i].classList.remove('active');
      cards[i].classList.add('not-active');
    }
  }
}

function updateDots(dotsWrapper, currentIndex) {
  const dots = dotsWrapper.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}
function onHoverCarousel(content, currentIndex, direction, gap) {
  const itemWidth = (content.children[currentIndex].offsetWidth);
  const offsetPercentage = 0.07;
  const currentOffset = -(currentIndex * (itemWidth + gap));
  const offset = direction === 'right' ? -((offsetPercentage * itemWidth) + gap) : ((offsetPercentage * itemWidth) + gap);
  content.style.transform = `translate3d(${offset + currentOffset}px, 0px, 0px)`;
  content.style.transitionDuration = '750ms';
  content.style.transitionDelay = '100ms';
}

function onHoverCarouselLeave(content, currentIndex, gap) {
  content.style.transform = 'translate3d(-261.818px, 0px, 0px)';
  content.style.transitionDuration = '0ms';
  content.style.transitionDelay = '0ms';
  if (iconClicked) {
    updateCarousel(content, currentIndex, gap);
  }
}

function updateButtonVisibility(prevButton, nextButton, currentIndex, totalItems, itemsToShow) {
  if (!prevButton || !nextButton) return;
  const prevParent = prevButton.parentElement;
  const nextParent = nextButton.parentElement;
  if (!prevParent || !nextParent) return;

  if (currentIndex === 0) {
    prevButton.classList.add('hide-icon');
    prevParent.classList.add('hide-icon');
  } else {
    prevButton.classList.remove('hide-icon');
    prevParent.classList.remove('hide-icon');
  }

  if (currentIndex >= totalItems - itemsToShow) {
    nextButton.classList.add('hide-icon');
    nextParent.classList.add('hide-icon');
  } else {
    nextButton.classList.remove('hide-icon');
    nextParent.classList.remove('hide-icon');
  }
}

function addTouchSlideFunctionality(block, content, totalItems, itemsToShow, currentIndex, gap) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let startTime = 0;
  let index = currentIndex;

  let endTime = 0;
  let moved = false;
  const maxClickDuration = 200;
  const minSlideDistance = 100;

  content.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    startTime = new Date().getTime();
    isDragging = true;
    moved = false;
  });
  content.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].pageX;
    const dx = currentX - startX;
    if (Math.abs(dx) >= minSlideDistance) {
      moved = true;
      const itemWidth = content.children[index].offsetWidth;
      const offset = -(index * (itemWidth + gap)) + dx;
      content.style.transform = `translate3d(${offset}px, 0px, 0px)`;
    }
  });

  content.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    endTime = new Date().getTime();
    const dx = currentX - startX;
    const duration = endTime - startTime;
    if (!moved || (Math.abs(dx) < minSlideDistance && duration < maxClickDuration)) {
      return; // avoide small movements and quick touches (clicks)
    }
    const itemWidth = content.children[index].offsetWidth;
    const threshold = itemWidth * 0.6; // threshold to move to next/previous item

    if (Math.abs(dx) > threshold) {
      if (dx > 0 && index > 0) {
        index -= 1;
      } else if (dx < 0 && index < totalItems - itemsToShow) {
        index += 1;
      }
    }
    content.style.transitionDuration = '300ms';
    updateCarousel(content, index, gap);
    updateDots(block.querySelector('.dots-navigation'), index);
  });
}

function addDotsNavigation(block, content, totalItems, itemsToShow, gap) {
  let dotsWrapper = block.querySelector('.dots-navigation');
  if (dotsWrapper) {
    dotsWrapper.remove();
  }

  dotsWrapper = document.createElement('div');
  dotsWrapper.classList.add('dots-navigation');

  const preButton = block && block.querySelector('.carousel-btn-prev');
  const nexButton = block.querySelector('.carousel-btn-next');
  let currentIndex = 0;
  function updateDotCarousel() {
    updateCarousel(content, currentIndex, gap);
  }
  let totalDots;
  if (totalItems > 1) {
    totalDots = totalItems;
  } else {
    totalDots = 0;
  }
  function createClickHandler(index) {
    return function handleClick() {
      currentIndex = index;
      updateDotCarousel();
      updateDots(dotsWrapper, currentIndex);
      updateButtonVisibility(
        preButton,
        nexButton,
        currentIndex,
        totalItems,
        itemsToShow,
      );
      addTouchSlideFunctionality(block, content, totalItems, itemsToShow, currentIndex, gap);
    };
  }

  for (let i = 0; i < totalDots; i += 1) {
    const dotButton = document.createElement('button');
    dotButton.classList.add('dot');
    if (i === 0) dotButton.classList.add('active');
    dotButton.addEventListener('click', (createClickHandler(i)));
    dotsWrapper.append(dotButton);
  }

  block.append(dotsWrapper);
  block.dataset.dotsAdded = 'true';
}

function addIconCarouselControls(
  block,
  content,
  totalItems,
  itemsToShow,
  carouselLeftWrapper,
  carouselRightWrapper,
  gap,
) {
  let prevButton = block.querySelector('.carousel-btn-prev');
  let nextButton = block.querySelector('.carousel-btn-next');

  if (prevButton) {
    prevButton.remove();
  }

  if (nextButton) {
    nextButton.remove();
  }
  prevButton = document.createElement('button');
  prevButton.classList.add('carousel-btn-prev');

  nextButton = document.createElement('button');
  nextButton.classList.add('carousel-btn-next');

  carouselLeftWrapper.append(prevButton);
  carouselRightWrapper.append(nextButton);
  let currentIndex = 0;
  function updateIconCarousel() {
    updateCarousel(content, currentIndex, gap);
  }

  carouselRightWrapper.addEventListener('mouseover', () => {
    onHoverCarousel(content, currentIndex, 'right', gap);
  });
  carouselRightWrapper.addEventListener('mouseleave', () => {
    onHoverCarouselLeave(content, currentIndex, gap);
  });

  carouselLeftWrapper.addEventListener('mouseover', () => {
    onHoverCarousel(content, currentIndex, 'left', gap);
  });
  carouselLeftWrapper.addEventListener('mouseleave', () => {
    onHoverCarouselLeave(content, currentIndex, gap);
  });

  carouselLeftWrapper.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      iconClicked = true;
      updateDots(block.querySelector('.dots-navigation'), currentIndex);
      updateIconCarousel();
      updateButtonVisibility(
        prevButton,
        nextButton,
        currentIndex,
        totalItems,
        itemsToShow,
      );
    }
  });
  carouselRightWrapper.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsToShow) {
      currentIndex += 1;
      iconClicked = true;
      updateDots(block.querySelector('.dots-navigation'), currentIndex);
      updateIconCarousel();
      updateButtonVisibility(
        prevButton,
        nextButton,
        currentIndex,
        totalItems,
        itemsToShow,
      );
    }
  });
  updateButtonVisibility(
    prevButton,
    nextButton,
    currentIndex,
    totalItems,
    itemsToShow,
  );
}

function updateItemsToShow(preconGalleryContent) {
  const viewport =  window.innerWidth;

  const totalItems = preconGalleryContent.childElementCount;
  const computedStyle = getComputedStyle(preconGalleryContent);
  const paddingLeft = parseFloat(computedStyle.paddingLeft);
  const paddingRight = parseFloat(computedStyle.paddingRight);
  const desktopScreenWidth = viewport - (paddingLeft + paddingRight);

  // padding only for more than 1280 viewport
  const desktopContentPadding = document.querySelector('.section.precon-container');
  const computedStyleDesktop = getComputedStyle(desktopContentPadding);
  const paddingLeftDesktop = parseFloat(computedStyleDesktop.paddingLeft);
  const paddingRightDesktop = parseFloat(computedStyleDesktop.paddingRight);
  const ultraScreenWidth = viewport - (paddingLeftDesktop + paddingRightDesktop);
  const availableWidth = viewport >= 1920 ? ultraScreenWidth : desktopScreenWidth;
  const cardsToShow = 1.5;
  return { cardsToShow, availableWidth, totalItems };
}

export function resizePreconBlock() {
  const viewport =  window.innerWidth;
  const carousels = document.querySelectorAll('.precon-image-container');
  carousels.forEach((carouselContent) => {
    const block = carouselContent.closest('.precon.block');
    const cards = carouselContent.querySelectorAll('.img-card-container');
    const carouselLeftWrapper = block.querySelector('.precon-wrapper-lft-area');
    const carouselRightWrapper = block.querySelector('.precon-wrapper-rth-area');

    const gap = 0;
    const { cardsToShow, availableWidth, totalItems } = updateItemsToShow(carouselContent);

    const cardWidth = ((availableWidth - (cardsToShow - 1)) / cardsToShow);
    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;
      card.style.marginRight = `${gap}px`;
    });

    addTouchSlideFunctionality(
      block,
      carouselContent,
      totalItems,
      cardsToShow,
      0,
      gap,
    );
    if (viewport >= 1024 && totalItems > 1) {
      addIconCarouselControls(
        block,
        carouselContent,
        totalItems,
        cardsToShow,
        carouselLeftWrapper,
        carouselRightWrapper,
        gap,
      );
    }
    addDotsNavigation(block, carouselContent, totalItems, cardsToShow, gap);
    updateCarousel(carouselContent, 0, gap);
  });
}

export function preconResizer() {
  resizePreconBlock();
  console.log('hello');

  // windo resize event
  window.addEventListener('resize', () => {
    resizePreconBlock();
  });
}

function generatePrecon(wdhContext, linkTab, preconData) {
  const preTitle = document.createElement('div');
  preTitle.classList.add('precon-title');

  const preCtaWrap = document.querySelector('.precon-link');

  const preconDesWrapper = document.createElement('div');
  preconDesWrapper.classList.add('precon-description');

  const preconAnchorElm = linkTab?.querySelector('a') || '';

  preCtaWrap.append(preconAnchorElm);
  preconData.append(wdhContext, preCtaWrap)
  resizePreconBlock();
}


function configureCTA(selectedModel, currentVechileData) {
  let selectedModelValue;
  if (selectedModel === 'modelRange'){
    return selectedModelValue = `https://configure.bmw.rs/sr_RS/configure/${currentVechileData.modelRangeCode}`
  }
  if (selectedModel === 'modelCode') {
    return selectedModelValue = `https://configure.bmw.rs/sr_RS/configure/${currentVechileData.modelRangeCode}/${currentVechileData.modelCode}`
  }
  if (selectedModel === 'allOptions') {
    return selectedModelValue = `https://configure.bmw.rs/sr_RS/configure/${currentVechileData.modelRangeCode}/${currentVechileData.modelCode}/${currentVechileData.fabric}/${currentVechileData.paint}/${currentVechileData.options}`
  }
  return selectedModelValue;
}

async function generateCosyImage(headLineDom, wdhContext, imageDomContainer) {
  const imageCardContainer = document.createElement('div');
  imageCardContainer.classList.add('img-card-container');
  const imageCard = document.createElement('div');
  imageCard.classList.add('img-card');

  let preConModelResponse;
  let preConCosyImage;
  let preConHeadLine;
  let optionsValue;
  let configureLink;
  let configureCTADom;
  let preConImageDOM;
  
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
    imageCard.append(preConImageDOM, preConHeadLine)
    imageCardContainer.append(imageCard);
    imageDomContainer.append(imageCardContainer);
  }
  resizePreconBlock();
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
    const [wdhContext, linkTab] = preconData.children;
    
    preconData.children[0].classList.add('precon-wdh');
    preconData.children[1].classList.add('precon-link');

    generateCosyImage(headLineDom, wdhContext, imageDomContainer);
    generatePrecon(wdhContext, linkTab, preconData);
    contentData.append(preconData);
  }
  block.textContent = '';
  block.append(imageDomContainer, preconLeftWrapper, preconRightWrapper, contentData );
  resizePreconBlock();
}
