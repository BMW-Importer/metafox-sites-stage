import { loadVideoEmbed } from '../video/video.js';
import generateVideoDetailMarkUp from '../video-slide/video-slide.js';
import { generateImgSlidePicture, generateImgSlideDetailMarkUp } from '../image-slide/image-slide.js';

let startTouchX = 0;
let endTouchX = 0;
const showMoreText = 'Prikaži više';
const showLessText = 'Prikaži manje';

function enableShowMoreButton() {
  const detailContainer = document.querySelectorAll('.vid-img-slide-expand-cover');
  detailContainer.forEach((item) => {
    const showMoreBtn = item.querySelector('.vid-img-slide-showmore-btn');

    if (showMoreBtn) {
      // if showmore button is already clicked then click showless before enabling it
      if (showMoreBtn.classList.contains('showless')) {
        const showMoreBtnElm = showMoreBtn.querySelector('button');
        showMoreBtnElm.click();
      }

      // enable showmore button based on overflowing content
      if (item.scrollHeight > item.clientHeight) {
        showMoreBtn.classList.remove('hidden');
      } else {
        showMoreBtn.classList.add('hidden');
      }
    }
  });
}

// this function will run when resolution is for desktop, it loops through all
// multicontent gallery blocks and opens first card and hides rest other ccards
function generateViewForDesktop() {
  const multiMediaBlocks = document.querySelectorAll('.multicontent-gallery.block');

  multiMediaBlocks.forEach((item) => {
    // scroll to startshowMoreTextg of detail childs
    const detailContainer = item.querySelector('.video-image-detail-container');

    if (detailContainer) {
      detailContainer.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }

    if (item.querySelector('.video-image-slide-conatiner')) {
      const mediaContainer = item.querySelector('.video-image-slide-conatiner').querySelectorAll('.video-image-slide.media');
      mediaContainer.forEach((media) => {
        media.classList.remove('visible');
      });
    }

    // make first detail as open state
    // call click event for first click
    const firstDetailHeadingElem = item.querySelector('.vid-img-slide-cover');
    if (firstDetailHeadingElem) {
      firstDetailHeadingElem.click();
    }
  });
}

function triggerAfterResize() {
  let heightCalValue = 88;
  // if screen widht is greater than 1280 then enable first element as opened card
  if (window.screen.width >= 1920) {
    heightCalValue = 88;
    generateViewForDesktop();
    enableShowMoreButton();
  } else if (window.screen.width >= 1280 && window.screen.width <= 1919) {
    heightCalValue = 118;
    generateViewForDesktop();
    enableShowMoreButton();
  } else if (window.screen.width >= 768) {
    heightCalValue = 40;
  }

  // set height of multicontent gallery block based on video and detail height
  const multiContentGalleryBlock = document.querySelectorAll('.multicontent-gallery.block');

  multiContentGalleryBlock.forEach((mcgBlock) => {
    const videoImgContainer = mcgBlock.querySelector('.video-image-slide-conatiner');
    const videoImgDetailContainer = mcgBlock.querySelector('.vid-img-slide.detail');
    const desktopVidDetailHeadings = mcgBlock.querySelectorAll('.vid-img-slide-cover');
    if (videoImgContainer && videoImgDetailContainer) {
      const videoImgContainerHeight = videoImgContainer.offsetHeight;
      const videoImgDetailContainerHeight = videoImgDetailContainer.offsetHeight;
      const detailheight = videoImgDetailContainerHeight - heightCalValue;
      const mcgBlockHeight = videoImgContainerHeight + detailheight;

      // setting min height of mcgBlock
      mcgBlock.style.minHeight = `${mcgBlockHeight}px`;

      const desktopVidDetailHeadingHeight = mcgBlock.offsetHeight - videoImgContainer.offsetHeight;

      // setting height of video detail heading which is only visible in desktop
      desktopVidDetailHeadings.forEach((vidDetailHeading) => {
        vidDetailHeading.style.minHeight = `${desktopVidDetailHeadingHeight}px`;
      });
    }
  });
}

function setTimeOutForSlideIn(childElem) {
  setTimeout(() => {
    childElem.classList.remove('slide-in');
    childElem.classList.add('slide-out');
    childElem.nextElementSibling.classList.remove('slide-out');
    childElem.nextElementSibling.classList.add('slide-in');
    enableShowMoreButton();
  }, 100);
}

function setTimeOutForSlideOut(childElem) {
  setTimeout(() => childElem.classList.remove('slide-out'), 100);
}

function addVisibleClass(listOfElem, indexOfElem) {
  if (listOfElem) {
    listOfElem.forEach((detailCardDiv, index) => {
      if (index === indexOfElem) {
        detailCardDiv.classList.add('visible');
      } else {
        detailCardDiv.classList.remove('visible');
      }
    });
  }
}

function attachDetailHeadingClickEvent(block) {
  const desktopDetailHeadingElem = block.querySelectorAll('.vid-img-slide-cover');
  desktopDetailHeadingElem.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const listOfDetailHeading = e.target.closest('.video-image-detail-container').querySelectorAll('.vid-img-slide-cover');
      const listOfDetailText = e.target.closest('.video-image-detail-container').querySelectorAll('.vid-img-slide.detail');
      listOfDetailHeading.forEach((childElem, index) => {
        const parentBlock = childElem.closest('.multicontent-gallery.block');
        let mediaElement;
        if (parentBlock) {
          mediaElement = parentBlock.querySelectorAll('.video-image-slide-conatiner .video-image-slide.media');
        }
        if (elem === childElem) {
          // adding class to show slide in effects
          childElem.classList.add('clicked');
          childElem.nextElementSibling.classList.add('slide-out');
          childElem.classList.add('slide-in');
          setTimeOutForSlideIn(childElem);

          if (mediaElement) {
            mediaElement[index].classList.add('visible');
          }

          // adding visible class to detail text div so that overlay
          // effects wont appear on this div
          if (listOfDetailText) {
            addVisibleClass(listOfDetailText, index);
          }
        } else {
          childElem.classList.remove('clicked');
          mediaElement[index].classList.remove('visible');
          setTimeOutForSlideOut(childElem);
        }
      });
    });
  });
}

function attachShowMoreEvents(block) {
  const showMoreBtn = block.querySelectorAll('.vid-img-slide-showmore-btn-link');
  const boxPaddingBottom = 14;
  showMoreBtn.forEach((btnElem) => {
    btnElem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const parentDiv = e.target.closest('.vid-img-slide-expand-cover');
      if (e.target.closest('.vid-img-slide-showmore-btn').classList.contains('showless')) {
        e.target.closest('.vid-img-slide-showmore-btn').classList.remove('showless');
        e.target.text = showMoreText;
        e.target.closest('.vid-img-slide-expand-cover').style.minHeight = 'unset';
      } else {
        e.target.closest('.vid-img-slide-showmore-btn').classList.add('showless');
        e.target.text = showLessText;
        const parentDivScrollHeight = parentDiv.scrollHeight - boxPaddingBottom;
        e.target.closest('.vid-img-slide-expand-cover').style.minHeight = `${parentDivScrollHeight}px`;
      }
    });
  });
}

function handleSwipe(galleryContainer) {
  const swipeDistance = startTouchX - endTouchX;
  if (swipeDistance === 0) {
    return;
  }

  const children = galleryContainer.querySelectorAll('.vid-img-slide.detail');
  const cardWidth = galleryContainer.querySelector('.vid-img-slide.detail').offsetWidth;
  const containerSwipedDistance = galleryContainer.scrollLeft;
  let indexToSwipe;
  if (swipeDistance > 0) {
    indexToSwipe = Math.ceil(containerSwipedDistance / cardWidth);
  } else {
    indexToSwipe = Math.floor(containerSwipedDistance / cardWidth);
  }

  if (indexToSwipe === 0) {
    galleryContainer.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  } else {
    galleryContainer.scrollTo({
      left: children[indexToSwipe].offsetLeft,
      behavior: 'smooth',
    });
  }

  // setting class so that overlay effects on cards go off when visible
  addVisibleClass(children, indexToSwipe);

  const videoImgGalleryElems = galleryContainer.parentElement.querySelector('.video-image-slide-conatiner').querySelectorAll('.video-image-slide.media');
  videoImgGalleryElems.forEach((item, index) => {
    if (index === indexToSwipe) {
      item.classList.add('visible');
    } else {
      item.classList.remove('visible');
    }
  });
}

function attachSlideEvents(galleryContainer) {
  let isDesktopDragging = false;
  let desktopScrollLeft = 0;

  // below events for swipe left and right of mob, tab and desktop
  galleryContainer.addEventListener('touchstart', (e) => {
    if (e.target === document.querySelector('.vid-img-slide-showmore-btn-link')) {
      return;
    }
    startTouchX = e.touches[0].clientX;
    const vidImgContainer = galleryContainer.previousElementSibling;
    vidImgContainer.classList.add('overlay-effect');
  });

  galleryContainer.addEventListener('mousedown', (e) => {
    isDesktopDragging = true;
    startTouchX = e.clientX;
    desktopScrollLeft = galleryContainer.scrollLeft;
    const vidImgContainer = galleryContainer.previousElementSibling;
    vidImgContainer.classList.add('overlay-effect');
  });

  galleryContainer.addEventListener('mousemove', (e) => {
    if (!isDesktopDragging) return;
    const deltX = e.clientX - startTouchX;
    galleryContainer.scrollLeft = desktopScrollLeft - deltX;
  });

  galleryContainer.addEventListener('touchend', (e) => {
    endTouchX = e.changedTouches[0].clientX;
    handleSwipe(galleryContainer);
    const vidImgContainer = galleryContainer.previousElementSibling;
    vidImgContainer.classList.remove('overlay-effect');
  });

  galleryContainer.addEventListener('mouseup', (e) => {
    isDesktopDragging = false;
    endTouchX = e.clientX;
    handleSwipe(galleryContainer);
    const vidImgContainer = galleryContainer.previousElementSibling;
    vidImgContainer.classList.remove('overlay-effect');
  });
}

export function multiContentGalFunAfterPageLoad() {
  enableShowMoreButton();
  triggerAfterResize();

  // windo resize event
  window.addEventListener('resize', () => {
    enableShowMoreButton();
    triggerAfterResize();
  });
}

export default function decorate(block) {
  const videoImageContainer = document.createElement('div');
  videoImageContainer.classList.add('video-image-slide-conatiner');

  const videoImageDetailsContainer = document.createElement('div');
  videoImageDetailsContainer.classList.add('video-image-detail-container');
  attachSlideEvents(videoImageDetailsContainer);

  // get all children elements
  const panels = [...block.children];

  // loop through all children blocks
  [...panels].forEach((panel, index) => {
    const [classList] = panel.children;
    const classesText = classList.textContent.trim();
    const classes = (classesText ? classesText.split(',') : []).map((c) => c?.trim()).filter((c) => !!c);

    // hidding origin div so that in author page its not visible
    panel.classList.add('hidden');

    // checking which is current block children
    if ([...classes].includes('video-slide')) {
      const [, , videoSlideHeadline, videoSlideCopyText, ,
        videoSlideTitle, videoSlideDescription, videoSlideDesktopVideoRef,
        videoSlideMobVideoRef, videoSlideDesktopPosterImgRef, videoSlideMobPosterImgRef,
        videoSlideLoopVideo, videoSlideAutoPlayVideo, , videoSlideButton] = panel.children;

      const videoDOMContainer = document.createElement('div');
      videoDOMContainer.classList.add('video-image-slide', 'media');
      videoDOMContainer.classList.add(`video-image-slide-${index}`);
      if (index === 0) {
        videoDOMContainer.classList.add('visible');
      }

      // extracting video link
      const videoLinkObj = {};
      const posterObj = {};

      if (videoSlideDesktopVideoRef) videoLinkObj.desktop = videoSlideDesktopVideoRef.querySelector('a').href;
      if (videoSlideMobVideoRef) videoLinkObj.mobile = videoSlideMobVideoRef.querySelector('a').href;

      if (videoSlideDesktopPosterImgRef) posterObj.desktop = videoSlideDesktopPosterImgRef?.querySelector('img')?.getAttribute('src');
      if (videoSlideMobPosterImgRef) posterObj.mobile = videoSlideMobPosterImgRef?.querySelector('img')?.getAttribute('src');

      // converting string to boolen
      const isLoopVideo = videoSlideLoopVideo.textContent.trim() === 'true';
      const isAutoPlayVideo = videoSlideAutoPlayVideo.textContent.trim() === 'true';
      const isEnableControls = false;
      const isMuted = false;
      const onHoverPlay = false;
      // generating video
      // delete replace link with 'videoSlideDesktopVideoRef.textContent.trim()
      loadVideoEmbed(
        videoDOMContainer,
        videoSlideTitle.textContent,
        videoSlideDescription.textContent,
        videoLinkObj,
        isAutoPlayVideo,
        isLoopVideo,
        isEnableControls,
        isMuted,
        posterObj,
        onHoverPlay,
      );

      // call function for generating video slide UI
      videoImageContainer.append(videoDOMContainer);

      // call function to generate video detail div
      videoImageDetailsContainer.append(generateVideoDetailMarkUp([
        videoSlideHeadline.textContent.trim(), videoSlideCopyText,
        videoSlideTitle.textContent.trim(), videoSlideDescription.textContent.trim(),
        videoSlideButton, index]));
    } else if ([...classes].includes('image-slide')) {
      const [imageSlideClassname, , imageSlideHeadline, imageSlideCopyText, ,
        imageSlideImgRef, imageSlideAltText, , imgSlideBtn] = panel.children;

      const imgDOMContainer = document.createElement('div');
      imgDOMContainer.classList.add('video-image-slide', 'media');
      imgDOMContainer.classList.add(`video-image-slide-${index}`);

      if (index === 0) {
        imgDOMContainer.classList.add('visible');
      }
      if (imageSlideClassname?.textContent) {
        imgDOMContainer.classList.add(imageSlideClassname.textContent);
      }

      // append picture to imgDomContainer div
      generateImgSlidePicture([imgDOMContainer,
        imageSlideImgRef, imageSlideAltText.textContent.trim()]);

      // call function for generating image slide UI
      videoImageContainer.append(imgDOMContainer);

      // call function for generating image slide details
      videoImageDetailsContainer.append(generateImgSlideDetailMarkUp([
        imageSlideHeadline.textContent.trim(), imageSlideCopyText,
        imgSlideBtn, index]));
    }
    // panel.textContent = '';
  });

  // block.textContent = '';
  block.append(videoImageContainer);
  block.append(videoImageDetailsContainer);

  // attache events for details div
  attachShowMoreEvents(block);
  // attach click event for desktop heading click
  attachDetailHeadingClickEvent(block);
  triggerAfterResize();
}
