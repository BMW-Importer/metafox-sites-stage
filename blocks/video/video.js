function embedYoutube(url, autoplay) {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
}

function embedVimeo(url, autoplay) {
  const [, video] = url.pathname.split('/');
  const suffix = autoplay ? '?muted=1&autoplay=1' : '';
  return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://player.vimeo.com/video/${video}${suffix}"
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
  console.log(onHoverPlay);
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
  sourceEl.setAttribute('src', source);
  if (videoFormat === '.mp4') {
    sourceEl.setAttribute('type', `video/${source.split('.').pop()}`);
  } else if (videoFormat === '.m3u8') {
    sourceEl.setAttribute('type', 'application/x-mpegURL');
  }
  video.append(sourceEl);

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
  link,
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

  if (isAbsoluteUrl(link)) {
    url = new URL(link);
  } else {
    url = new URL(link, baseUrl);
  }

  const isYoutube = link.includes('youtube') || link.includes('youtu.be');
  const isVimeo = link.includes('vimeo');
  const isMp4 = link.includes('.mp4');
  const isM3U8 = link.includes('.m3u8');

  const videoScriptDOM = document.createRange().createContextualFragment('<link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" /><script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>');
  if (isYoutube) {
    block.innerHTML = embedYoutube(url, autoplay);
  } else if (isVimeo) {
    block.innerHTML = embedVimeo(url, autoplay);
  } else if (isMp4) {
    block.textContent = '';
    block.append(videoScriptDOM);
    block.append(getVideoElement(link, '.mp4', autoplay, loop, enableControls, muted, placeholder, onHoverPlay));
  } else if (isM3U8) {
    block.textContent = '';
    block.append(videoScriptDOM);
    block.append(getVideoElement(link, '.m3u8', autoplay, loop, enableControls, muted, placeholder, onHoverPlay));
  }

  block.dataset.embedIsLoaded = true;
}

export default async function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [videoPoster, , videoControls] = props;
  const placeholder = block.querySelector('picture');

  const link = block.querySelector('a').href;
  block.textContent = '';
  const videoControlProperties = videoControls ? videoControls.innerText.split(',') : [];
  const autoplay = !!videoControlProperties.includes('autoplay');
  const loop = !!videoControlProperties.includes('loop');
  const enableControls = !!videoControlProperties.includes('enableVideoControls');
  const muted = !!videoControlProperties.includes('muted');
  const onHoverPlay = !!videoControlProperties.includes('playOnHover');

  if (placeholder) {
    loadVideoEmbed(block, link, autoplay, loop, enableControls, muted, onHoverPlay, videoPoster.querySelector('img').getAttribute('src'));
  } else {
    block.classList.add('lazy-loading');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadVideoEmbed(block, link, autoplay, videoControls);
        block.classList.remove('lazy-loading');
      }
    });
    observer.observe(block);
  }
}
