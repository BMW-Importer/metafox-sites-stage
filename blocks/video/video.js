export function changeAllVidSrcOnResize() {
  window.addEventListener('resize', () => {
    const listOfVideos = document.querySelectorAll('video');
    listOfVideos.forEach((video) => {
      if (window.screen >= 768) {
        const desktopVidPath = video.getAttribute('data-desktop-vid');
        const sourceEl = video.querySelector('source');
        video.src = desktopVidPath;
        sourceEl.src = desktopVidPath;
      } else {
        const MobVidePath = video.getAttribute('data-mobile-vid');
        const sourceEl = video.querySelector('source');
        video.src = MobVidePath;
        sourceEl.src = MobVidePath;
      }
    });
  });
}
function embedYoutube(url, autoplay) {
  const uspDesktop = new URLSearchParams(url.source.desktop.search);
  const uspMobile = new URLSearchParams(url.source.mobile.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vidDesktop = uspDesktop.get('v') ? encodeURIComponent(uspDesktop.get('v')) : '';
  let vidMobile = uspMobile.get('v') ? encodeURIComponent(uspMobile.get('v')) : '';

  const embed = url.pathname;
  if (url.source.desktop.origin.includes('youtu.be')) {
    [, vidDesktop] = url.source.desktop.pathname.split('/');
  }
  if (url.source.mobile.origin.includes('youtu.be')) {
    [, vidMobile] = url.source.mobile.pathname.split('/');
  }
  if (window.innerWidth > 768) {
    return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="https://www.youtube.com${vidDesktop ? `/embed/${vidDesktop}?rel=0&v=${vidDesktop}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
  </div>`;
  }
  return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="https://www.youtube.com${vidMobile ? `/embed/${vidMobile}?rel=0&v=${vidMobile}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
  </div>`;
}

function embedVimeo(url, autoplay) {
  const [, videoDesktop] = url.source.desktop.pathname.split('/');
  const [, videoMobile] = url.source.mobile.pathname.split('/');

  const suffix = autoplay ? '?muted=1&autoplay=1' : '';
  return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://player.vimeo.com/video/${videoDesktop || videoMobile}${suffix}"
      style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
      frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen  
      title="Content from Vimeo" loading="lazy"></iframe>
    </div>`;
}

function getVideoElement(
  source,
  videoFormat,
  autoplay,
  enableLoop,
  enableControls,
  muted,
  poster,
  onHoverPlay,
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
  if (onHoverPlay) {
    video.setAttribute('playOnHover', '');
  }
  video.setAttribute('preload', 'auto');
  video.setAttribute('class', 'video-js');

  video.setAttribute('data-setup', '{}');
  video.setAttribute('width', '641');
  video.setAttribute('height', '264');
  video.setAttribute('poster', poster);
  const sourceEl = document.createElement('source');

  const mobileWidth = window.innerWidth <= 768;
  if (source.desktop && !mobileWidth) {
    sourceEl.setAttribute('src', source.desktop);
  } else {
    sourceEl.setAttribute('src', source.mobile);
  }

  sourceEl.setAttribute('data-desktop-vid', source.desktop);
  sourceEl.setAttribute('data-mobile-vid', source.mobile);

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

  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
  if (onHoverPlay) {
    video.addEventListener('mouseenter', () => {
      if (video.paused) {
        video.play();
      }
    });

    video.addEventListener('mouseleave', () => {
      if (!video.paused) {
        video.pause();
      }
    });
  }

  video.addEventListener('touchstart', () => {
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

// function to check given url is absolute or relative
function isAbsoluteUrl(url) {
  return /^(https?:)?\/\//i.test(url);
}

export function loadVideoEmbed(
  block,
  linkObject,
  autoplay,
  loop,
  enableControls,
  muted,
  onHoverPlay,
  placeholder,
) {
  if (block.dataset.embedIsLoaded) {
    return;
  }

  const baseUrl = window.location.origin;
  let url;
  if (isAbsoluteUrl(linkObject)) {
    url = new URL(linkObject);
  } else {
    url = new URL(linkObject, baseUrl);
  }

  const isYoutube = linkObject.desktop ? linkObject.desktop.includes('youtube') || linkObject.desktop.includes('youtu.be')
    : linkObject.mobile.includes('youtube') || linkObject.mobile.includes('youtu.be');
  const isVimeo = linkObject.desktop ? linkObject.desktop.includes('vimeo')
    : linkObject.mobile.includes('vimeo');
  const isMp4 = linkObject.desktop ? linkObject.desktop.includes('.mp4')
    : linkObject.mobile.includes('.mp4');
  const isM3U8 = linkObject.desktop ? linkObject.desktop.includes('.m3u8')
    : linkObject.mobile.includes('.m3u8');

  const videoScriptDOM = document.createRange().createContextualFragment('<link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" /><script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>');
  if (isYoutube) {
    block.innerHTML = embedYoutube(url, autoplay);
  } else if (isVimeo) {
    block.innerHTML = embedVimeo(url, autoplay);
  } else if (isMp4) {
    block.textContent = '';
    block.append(videoScriptDOM);
    block.append(getVideoElement(linkObject, '.mp4', autoplay, loop, enableControls, muted, onHoverPlay, placeholder));
  } else if (isM3U8) {
    block.textContent = '';
    block.append(videoScriptDOM);
    block.append(getVideoElement(linkObject, '.m3u8', autoplay, loop, enableControls, muted, onHoverPlay, placeholder));
  }

  block.dataset.embedIsLoaded = true;
}

export default async function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [
    videoTitle,
    videoDescp,
    videoDesktopPath,
    videoMobPath,
    videoDesktopPoster,
    videoMobPoster,
    videoLoop,
    videoAutoPlay,
    videoHideControls,
    videoMute,
    playonHover] = props;

  const placeholder = block.querySelector('picture');
  const desktopVideolink = videoDesktopPath?.textContent;
  const mobileVideolink = videoMobPath?.textContent;

  const linkObject = {
    desktop: desktopVideolink,
    mobile: mobileVideolink,
  };
  block.textContent = '';
  const autoplay = videoAutoPlay.textContent.trim() === 'true';
  const loop = videoLoop.textContent.trim() === 'true';
  const enableControls = videoHideControls.textContent.trim() === 'true';
  const muted = videoMute.textContent.trim() === 'true';
  const onHoverPlay = playonHover.textContent.trim() === 'true';

  if (placeholder) {
    loadVideoEmbed(block, linkObject, videoTitle, videoDescp, videoDesktopPath, videoMobPath, autoplay, loop, enableControls, muted, onHoverPlay, videoMobPoster?.querySelector('img')?.getAttribute('src'), videoDesktopPoster.querySelector('img').getAttribute('src'));
  } else {
    block.classList.add('lazy-loading');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadVideoEmbed(
          block,
          linkObject,
          autoplay,
          autoplay,
          loop,
          enableControls,
          muted,
          onHoverPlay,
        );
        block.classList.remove('lazy-loading');
      }
    });
    observer.observe(block);
  }
}
