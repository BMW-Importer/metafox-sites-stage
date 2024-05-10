let isScriptAdded = false;

export function changeAllVidSrcOnResize() {
  window.addEventListener('resize', () => {
    const listOfVideos = document.querySelectorAll('video');
    listOfVideos.forEach((video) => {
      const sourceEl = video.querySelector('source');
      const posterDiv = video.parentElement.querySelector('.vjs-poster picture img');

      const desktopVidPath = sourceEl.getAttribute('data-desktop-vid');
      const mobileVidPath = sourceEl.getAttribute('data-mobile-vid');

      const desktopPosterPath = video.getAttribute('data-desktop-poster');
      const mobilePosterPath = video.getAttribute('data-mobile-poster');

      if (window.innerWidth > 768) {
        if (video.src !== desktopVidPath) {
          video.src = desktopVidPath;
          sourceEl.src = desktopVidPath;
          video.poster = desktopPosterPath;
          posterDiv.src = desktopPosterPath;
        }
      } else if (mobileVidPath) {
        if (video.src !== mobileVidPath) {
          video.src = mobileVidPath;
          sourceEl.src = mobileVidPath;
          video.poster = mobilePosterPath;
          posterDiv.src = mobilePosterPath;
        }
      }
    });
  });
}

function getVideoElement(
  videoTitle,
  videoDescp,
  source,
  videoFormat,
  autoplay,
  enableLoop,
  enableControls,
  muted,
  posters,
) {
  const video = document.createElement('video');
  video.dataset.loading = 'true';
  video.addEventListener('loadedmetadata', () => delete video.dataset.loading);
  if (enableControls) {
    video.setAttribute('controls', '');
  }

  if (autoplay) {
    video.setAttribute('autoplay', '');
  }

  if (enableLoop) {
    video.setAttribute('loop', '');
  }

  if (muted) {
    video.setAttribute('muted', '');
  }

  video.setAttribute('preload', 'auto');
  video.setAttribute('class', 'video-js');

  video.setAttribute('data-setup', '{}');
  video.setAttribute('width', '600');
  video.setAttribute('height', '400');
  video.setAttribute('title', videoTitle?.textContent);
  video.setAttribute('data-description', videoDescp?.textContent);

  const sourceEl = document.createElement('source');

  const mobileWidth = window.innerWidth < 768;
  if (source.desktop && !mobileWidth) {
    sourceEl.setAttribute('src', source?.desktop);
    video.setAttribute('poster', posters?.desktop);
    video.classList.add('text-with-video');
  } else if (source.mobile) {
    sourceEl.setAttribute('src', source?.mobile);
    video.setAttribute('poster', posters?.mobile || '');
  } else {
    sourceEl.setAttribute('src', source?.desktop);
    video.setAttribute('poster', posters?.desktop);
  }

  video.setAttribute('data-desktop-poster', posters?.desktop);
  video.setAttribute('data-mobile-poster', posters?.mobile || '');

  sourceEl.setAttribute('data-desktop-vid', source?.desktop);
  sourceEl.setAttribute('data-mobile-vid', source?.mobile);

  if (source.desktop && !mobileWidth) {
    if (videoFormat === '.mp4') {
      sourceEl.setAttribute('type', `video/${source.desktop.split('.').pop()}`);
    } else if (videoFormat === '.m3u8') {
      sourceEl.setAttribute('type', 'application/x-mpegURL');
    }
    video.append(sourceEl);
  } else {
    if (videoFormat === '.mp4') {
      sourceEl.setAttribute('type', `video/${source.mobile.split('.').pop()}`);
    } else if (videoFormat === '.m3u8') {
      sourceEl.setAttribute('type', 'application/x-mpegURL');
    }
    video.append(sourceEl);
  }

  video.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  let userUnmuted = false;

  video.addEventListener('volumechange', () => {
    if (!video.muted && video.volume > 0 && !userUnmuted) {
      userUnmuted = true;
    }
  });

  video.addEventListener('touchstart', (event) => {
    event.preventDefault();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.dataset.autoplay = autoplay ? 'true' : 'false';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (video) {
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play();
          }
        } else if (!video.paused) {
          video.pause();
        }
      }
    });
  }, { threshold: 0.1 });

  observer.observe(video);
  return video;
}

function isAbsoluteUrl(url) {
  return /^(https?:)?\/\//i.test(url);
}

function addWrapperDiv(block, element) {
  if (block.getElementsByClassName('wrapper-div')?.length) {
    const wrapperDiv = block.getElementsByClassName('wrapper-div');
    wrapperDiv[0].appendChild(element);
  } else {
    const div = document.createElement('div');
    div.classList.add('wrapper-div');
    div.append(element);
    block.append(div);
  }
}

export function loadVideoEmbed(
  block,
  videoTitle,
  videoDescp,
  linkObject,
  autoplay,
  loop,
  enableControls,
  muted,
  posters,
) {
  if (block.dataset.embedIsLoaded) {
    return;
  }

  const baseUrl = window.location.origin;
  let desktopUrl;
  let mobileUrl;
  if (isAbsoluteUrl(linkObject.desktop)) {
    desktopUrl = new URL(linkObject.desktop);
  } else {
    desktopUrl = new URL(linkObject.desktop, baseUrl);
  }
  if (isAbsoluteUrl(linkObject.mobile)) {
    mobileUrl = new URL(linkObject.mobile);
  } else {
    mobileUrl = new URL(linkObject.mobile, baseUrl);
  }

  const isMp4 = linkObject.desktop ? linkObject.desktop.includes('.mp4')
    : linkObject.mobile.includes('.mp4');
  const isM3U8 = linkObject.desktop ? linkObject.desktop.includes('.m3u8')
    : linkObject.mobile.includes('.m3u8');

  const isMobile = window.innerWidth < 768;

  const videoScriptDOM = document.createRange().createContextualFragment('<link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" /><script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>');
  const headElement = document.querySelector('head');

  if (isMp4) {
    block.textContent = '';

    if (!isScriptAdded) headElement.append(videoScriptDOM);
    isScriptAdded = true;
    addWrapperDiv(block, getVideoElement(videoTitle, videoDescp, linkObject, '.mp4', autoplay, loop, enableControls, muted, posters));
  } else if (isM3U8) {
    block.textContent = '';

    if (!isScriptAdded) headElement.append(videoScriptDOM);
    isScriptAdded = true;

    addWrapperDiv(block, getVideoElement(videoTitle, videoDescp, linkObject, '.m3u8', autoplay, loop, enableControls, muted, posters));
  }

  block.dataset.embedIsLoaded = true;
}

export function generateTextDOM(
  block,
  eyebrowStyle,
  eyebrow,
  headlineElement,
  description,
  buttonElement,
  componentName,
) {
  const div = document.createElement('div');
  const headline = document.createElement('h2');
  div.classList.add('text-alignment');
  eyebrow.classList.add(`${componentName.textContent}-eyebrow`);
  headline.classList.add(`${componentName.textContent}-headline`);
  description.classList.add(`${componentName.textContent}-description`);
  buttonElement.classList.add(`${componentName.textContent}-button`);
  if (eyebrowStyle === 'eyebrowbold1' || eyebrowStyle === 'eyebrowbold2') {
    eyebrow.classList.add('eyebrowbold');
  }
  headline.innerHTML = headlineElement.innerHTML;
  div.append(eyebrow, headline, description, buttonElement);
  addWrapperDiv(block, div);
}

export default function decorate(block) {
  const [video, image] = block.children;
  const [
    componentNameV,
    videoPropsGrp1,
    eyebrowStyleV,
    videoPropsGrp2,
  ] = [...video.children].filter((row) => row.children.length);

  const [
    componentNameI,
    imageDetails,
    imageEyebrowStyle,
    imageLink,
  ] = [...image.children].filter((row) => row.children.length);

  const [
    videoEyebrow,
    headline,
    description,
    videoButtonName,
    videoButtonElement,
  ] = videoPropsGrp1.children;

  const [
    videoTitle,
    videoDescp,
    desktopVidPath,
    mobileVidPath,
    desktopPosterPath,
    mobilePosterPath,
    videoLoop,
    videoAutoPlay,
    videoControl,
    videoMute,
  ] = videoPropsGrp2.children;

  const [
    imageEyebrow,
    imageHeadline,
    imageDescp,
    imageButtonName,
    imageButtonElement,
  ] = imageDetails.children;

  const placeholder = block.querySelectorAll('picture');

  const posters = {
    desktop: desktopPosterPath?.querySelector('img')?.getAttribute('src'),
    mobile: mobilePosterPath?.querySelector('img')?.getAttribute('src'),
  };

  const videoLinkObject = {
    desktop: desktopVidPath?.textContent,
    mobile: mobileVidPath?.textContent,
  };
  block.textContent = '';
  const enablecontrols = videoControl?.textContent.trim() === 'true';
  const loop = videoLoop?.textContent.trim() === 'true';
  const autoplay = videoAutoPlay?.textContent.trim() === 'true';
  const mute = videoMute?.textContent.trim() === 'true';
  imageButtonElement.ariaLabel = imageButtonName.textContent;
  videoButtonElement.ariaLabel = videoButtonName.textContent;
  const videoButtonAnchor = videoButtonElement.querySelector('a');
  videoButtonAnchor.textContent = videoButtonName.textContent;
  videoButtonAnchor.title = videoButtonName.textContent;
  if (placeholder) {
    loadVideoEmbed(
      block,
      videoTitle,
      videoDescp,
      videoLinkObject,
      autoplay,
      loop,
      enablecontrols,
      mute,
      posters,
    );
    generateTextDOM(
      block,
      eyebrowStyleV,
      videoEyebrow,
      headline,
      description,
      videoButtonElement,
      componentNameV,
    );
  } else {
    block.classList.add('lazy-loading');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadVideoEmbed(
          block,
          videoTitle,
          videoDescp,
          videoLinkObject,
          autoplay,
          loop,
          enablecontrols,
          mute,
          posters,
        );
        block.classList.remove('lazy-loading');
      }
    });
    observer.observe(block);
  }
}
