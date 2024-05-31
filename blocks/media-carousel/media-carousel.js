import { loadVideoEmbed } from '../video/video.js';

const viewportWidth = window.innerWidth;

function updateCarousel(content, currentIndex) {
  const itemWidth = (content.children[currentIndex].offsetWidth);
  const cardDesktopGap = 24;
  const cardMobileGap = 16;
  const gap = viewportWidth < 768 ? cardMobileGap : cardDesktopGap;
  const offset = -(currentIndex * (itemWidth + gap));
  content.style.transform = `translate3d(${offset}px, 0px, 0px)`;
  content.style.transitionDuration = '50ms';
  content.style.transitionDelay = '0ms';
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
let iconClicked = false;
function onHoverCarousel(content, currentIndex, direction) {
  const itemWidth = (content.children[currentIndex].offsetWidth);
  const cardDesktopGap = 24;
  const cardMobileGap = 16;
  const gap = viewportWidth < 768 ? cardMobileGap : cardDesktopGap;
  const offsetPercentage = 0.2; // 20%
  const currentOffset = -(currentIndex * (itemWidth + gap));
  const offset = direction === 'right' ? -((offsetPercentage * itemWidth) + gap) : ((offsetPercentage * itemWidth) + gap);
  content.style.transform = `translate3d(${offset + currentOffset}px, 0px, 0px)`;
  content.style.transitionDuration = '500ms';
  content.style.transitionDelay = '100ms';
}

function onHoverCarouselLeave(content, currentIndex) {
  content.style.transform = 'translate3d(0px, 0px, 0px)';
  content.style.transitionDuration = '500ms';
  content.style.transitionDelay = '100ms';
  if (iconClicked) {
    updateCarousel(content, currentIndex);
  }
}

function updateButtonVisibility(prevButton, nextButton, currentIndex, totalItems, itemsToShow) {
  if (currentIndex === 0) {
    prevButton.style.display = 'none'; // Hide prevButton when at the beginning
  } else {
    prevButton.style.display = 'block';
  }

  if (currentIndex >= totalItems - itemsToShow) {
    nextButton.style.display = 'none'; // Hide nextButton when at the end
  } else {
    nextButton.style.display = 'block';
  }
}

function addDotsNavigation(block, content, totalItems, itemsToShow) {
  const dotsWrapper = document.createElement('div');
  dotsWrapper.classList.add('dots-navigation');
  const preButton = block.querySelector('.carousel-control.prev');
  const nexButton = block.querySelector('.carousel-control.next');
  let totalDots;
  let currentIndex = 0;
  function updateDotCarousel() {
    updateCarousel(content, currentIndex);
  }

  if (viewportWidth >= 1280) {
    const visibleCards = 4;
    totalDots = totalItems > visibleCards ? totalItems - 3 : 0;
  } else if (viewportWidth >= 1024) {
    const visibleCards = 3;
    totalDots = totalItems > visibleCards ? totalItems - 2 : 0;
  } else if (viewportWidth >= 768) {
    const visibleCards = 2;
    totalDots = totalItems > visibleCards ? totalItems - 1 : 0;
  } else {
    totalDots = totalItems;
  }
  function createClickHandler(index) {
    return function handleClick() {
      currentIndex = index;
      updateDotCarousel();
      updateDots(dotsWrapper, currentIndex);
      updateButtonVisibility(preButton, nexButton, currentIndex, totalItems, itemsToShow);
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
}

function addIconCarouselControls(block, content, totalItems, itemsToShow) {
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control', 'prev');
  prevButton.innerHTML = '&lt;';
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control', 'next');
  nextButton.innerHTML = '&gt;';
  block.append(prevButton, nextButton);
  // addDotsNavigation(block, content, totalItems, prevButton, nextButton, itemsToShow);
  let currentIndex = 0;
  function updateIconCarousel() {
    updateCarousel(content, currentIndex);
  }

  nextButton.addEventListener('mouseover', () => {
    onHoverCarousel(content, currentIndex, 'right');
  });
  nextButton.addEventListener('mouseleave', () => {
    onHoverCarouselLeave(content, currentIndex);
  });

  prevButton.addEventListener('mouseover', () => {
    onHoverCarousel(content, currentIndex, 'left');
  });
  prevButton.addEventListener('mouseleave', () => {
    onHoverCarouselLeave(content, currentIndex);
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      iconClicked = true;
      updateDots(block.querySelector('.dots-navigation'), currentIndex);
      updateIconCarousel();
      updateButtonVisibility(prevButton, nextButton, currentIndex, totalItems, itemsToShow);
    }
  });
  nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsToShow) {
      currentIndex += 1;
      iconClicked = true;
      updateDots(block.querySelector('.dots-navigation'), currentIndex);
      updateIconCarousel();
      updateButtonVisibility(prevButton, nextButton, currentIndex, totalItems, itemsToShow);
    }
  });
  updateButtonVisibility(prevButton, nextButton, currentIndex, totalItems, itemsToShow);
}

function addTouchSlideFunctionality(block, content, totalItems, itemsToShow) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let startTime = 0;
  let endTime = 0;
  let moved = false;
  const maxClickDuration = 200;
  let currentIndex = 0;
  const cardGap = viewportWidth < 768 ? 16 : 24;
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
      const itemWidth = content.children[currentIndex].offsetWidth;
      const offset = -(currentIndex * (itemWidth + cardGap)) + dx;
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
    const itemWidth = content.children[currentIndex].offsetWidth;
    const threshold = itemWidth * 0.6; // threshold to move to next/previous item

    if (Math.abs(dx) > threshold) {
      if (dx > 0 && currentIndex > 0) {
        currentIndex -= 1;
      } else if (dx < 0 && currentIndex < totalItems - itemsToShow) {
        currentIndex += 1;
      }
    }
    content.style.transitionDuration = '300ms';
    updateCarousel(content, currentIndex);
    updateDots(block.querySelector('.dots-navigation'), currentIndex);
  });
}

export default function decorate(block) {
  const panels = [...block.children];

  const videoImageCarouselContent = document.createElement('div');
  videoImageCarouselContent.classList.add('video-image-carousel-content');

  block.textContent = '';

  // loop through all children blocks
  [...panels].forEach((panel, index) => {
    const [content, media, cta] = panel.children;
    if (media.children.length > 1) {
    // Create a wrapper for video card elements
      const videoCarouselCard = document.createElement('div');
      videoCarouselCard.classList.add('video-img-carousel-card');

      // Title , cta and description wrappers
      const vidImgTitleWrapper = document.createElement('div');
      vidImgTitleWrapper.classList.add('video-img-title');
      const vidImgCtaWrap = document.createElement('div');
      vidImgCtaWrap.classList.add('video-img-cta');
      const vidImgDesWrapper = document.createElement('div');
      vidImgDesWrapper.classList.add('video-img-description');

      // headline and copy text under general tab
      const contentElem = content.children;
      const videoCarouselHeadline = contentElem[0];
      const videoCarouselCopyText = contentElem[1];
      const vidImgAnchorElm = cta.querySelector('a');
      vidImgCtaWrap.append(vidImgAnchorElm);
      vidImgTitleWrapper.append(videoCarouselHeadline);
      vidImgDesWrapper.append(videoCarouselCopyText);

      // video tab details
      const videoCarouselContentPtags = media.querySelectorAll('p');

      const booleanVariableNames = ['loopVidep',
        'playOnHover',
        'hideVideoControls',
        'MutedVideo',
      ];
      const booleanValues = {};
      let booleanIndex = 0;
      videoCarouselContentPtags.forEach((p) => {
        const text = p.textContent.trim();
        if (text === 'true' || text === 'false') {
          booleanValues[booleanVariableNames[booleanIndex]] = (text === 'true');
          booleanIndex += 1;
        }
      });
      const videoCarouselTitle = videoCarouselContentPtags[0];
      const videoCarouselDescription = videoCarouselContentPtags[1];

      // video tab media
      const videoCarouselContentAtags = media.querySelectorAll('a');
      const videoCarouselDesktopVideoRef = videoCarouselContentAtags[0];
      const videoCarouselMobVideoRef = videoCarouselContentAtags[1];

      const videoContentPictureTags = media.querySelectorAll('picture');
      const videoCarouselDesktopPosterImgRef = videoContentPictureTags[0]?.querySelector('img')?.getAttribute('src');
      const videoCarouselMobPosterImgRef = videoContentPictureTags[1]?.querySelector('img')?.getAttribute('src');

      const videoDOMContainer = document.createElement('div');
      // extracting video link
      const videoLinkObj = {};
      const posterObj = {};

      if (videoCarouselDesktopVideoRef) videoLinkObj.desktop = videoCarouselDesktopVideoRef.href;
      if (videoCarouselMobVideoRef) videoLinkObj.mobile = videoCarouselMobVideoRef.href;

      if (videoCarouselDesktopPosterImgRef) posterObj.desktop = videoCarouselDesktopPosterImgRef;
      if (videoCarouselMobPosterImgRef) posterObj.mobile = videoCarouselMobPosterImgRef;

      const isLoopVideo = booleanValues.loopVidep;
      const enableHideControls = booleanValues.hideVideoControls;
      const isMuted = booleanValues.MutedVideo;
      const onHoverPlay = booleanValues.playOnHover;
      const isAutoPlayVideo = false;

      loadVideoEmbed(
        [videoDOMContainer,
          videoCarouselTitle.textContent,
          videoCarouselDescription.textContent,
          videoLinkObj,
          isAutoPlayVideo,
          isLoopVideo,
          enableHideControls,
          isMuted,
          posterObj,
          onHoverPlay],
      );
      // Append elements to the video card
      videoCarouselCard.append(
        videoDOMContainer,
        vidImgTitleWrapper,
        vidImgDesWrapper,
        vidImgCtaWrap,
      );
      videoImageCarouselContent.append(videoCarouselCard);
    } else {
      // image
      // Title and description wrappers, cta
      const imgTitleWrapper = document.createElement('div');
      imgTitleWrapper.classList.add('video-img-title');
      const imgDesWrapper = document.createElement('div');
      imgDesWrapper.classList.add('video-img-description');
      const vidImgCtaWrap = document.createElement('div');
      vidImgCtaWrap.classList.add('video-img-cta');
      const vidImgAnchorElm = cta?.querySelector('a');
      vidImgCtaWrap.append(vidImgAnchorElm);

      // headline and copy text under general tab
      const contentElem = content.children;
      const imgCarouselHeadline = contentElem[0];
      const imgCarouselCopyText = contentElem[1];
      imgTitleWrapper.append(imgCarouselHeadline);
      imgDesWrapper.append(imgCarouselCopyText);

      const imageCarouselImgRef = media.querySelector('picture');
      const imageCarouselCard = document.createElement('div');
      imageCarouselCard.classList.add('video-img-carousel-card');

      const imgDOMContainer = document.createElement('div');

      if (index === 0) {
        imgDOMContainer.classList.add('visible');
      }

      const propImgElem = imageCarouselImgRef.querySelector('img');
      const imageSlideAltText = propImgElem.getAttribute('alt');

      const pictureElement = document.createElement('picture');
      const imgElem = document.createElement('img');
      imgElem.src = propImgElem.src;
      imgElem.setAttribute('alt', imageSlideAltText);
      pictureElement.append(imgElem);

      imageCarouselCard.append(pictureElement, imgTitleWrapper, imgDesWrapper, vidImgCtaWrap);
      videoImageCarouselContent.append(imageCarouselCard);
    }
  });

  block.append(videoImageCarouselContent);

  // calculated dynamic width
  const totalItems = panels.length;
  const cards = block.querySelectorAll('.video-img-carousel-card');

  // padding only for less than 1280 viewport
  const carouselContent = document.querySelector('.video-image-carousel-content');
  const computedStyle = getComputedStyle(carouselContent);
  const paddingLeft = parseFloat(computedStyle.paddingLeft);
  const paddingRight = parseFloat(computedStyle.paddingRight);
  const desktopScreenWidth = viewportWidth - (paddingLeft + paddingRight);

  // padding only for more than 1280 viewport
  const desktopContentPadding = document.querySelector('.section.media-carousel-container');
  const computedStyleDesktop = getComputedStyle(desktopContentPadding);
  const paddingLeftDesktop = parseFloat(computedStyleDesktop.paddingLeft);
  const paddingRightDesktop = parseFloat(computedStyleDesktop.paddingRight);
  const largerScreenWidth = viewportWidth - (paddingLeftDesktop + paddingRightDesktop);

  const availableWidth = viewportWidth >= 1280 ? largerScreenWidth : desktopScreenWidth;

  let cardsToShow;
  if (viewportWidth >= 1280) {
    cardsToShow = Math.min(totalItems, 4);
  } else if (viewportWidth >= 1024) {
    cardsToShow = Math.min(totalItems, 3);
  } else if (viewportWidth >= 768) {
    cardsToShow = Math.min(totalItems, 2);
  } else {
    cardsToShow = 1;
  }

  const cardDesktopMargin = 24;
  const cardMobileMargin = 16;
  const cardMargin = viewportWidth < 768 ? cardMobileMargin : cardDesktopMargin;
  const cardWidth = (availableWidth - ((cardsToShow - 1) * cardMargin)) / cardsToShow;

  cards.forEach((card) => {
    card.style.width = `${cardWidth}px`;
    card.style.marginRight = `${cardMargin}px`;
  });

  if (viewportWidth <= 1024) {
    addTouchSlideFunctionality(block, videoImageCarouselContent, totalItems, cardsToShow);
  }
  if (viewportWidth >= 1280 && totalItems > 4) {
    addIconCarouselControls(block, videoImageCarouselContent, totalItems, cardsToShow);
  }
  addDotsNavigation(block, videoImageCarouselContent, totalItems, cardsToShow);
}
