export default function decorate(block) {
  const [general, media] = block.children;
  general.className = 'general';
  media.className = 'media';

  const [video, image] = block.children;
  const [
    componentNameV,
    videoPropsGrp1,
    eyebrowStyleV,
    videoPropsGrp2,
  ] = [...video.children].filter((row) => row.children.length);

  const [
    blankElementI1,
    componentNameI,
    imageDetails,
    imageEyebrowStyle,
    blankElementI2,
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
    videoMute
  ] = videoPropsGrp2.children;

  const [
    imageEyebrow,
    imageHeadline,
    imageDescp,
    imageButtonName,
    imageButtonElement,
  ] = imageDetails.children;

  const posters = {
    desktop: desktopPosterPath?.querySelector('img')?.getAttribute('src'),
    mobile: mobilePosterPath?.querySelector('img')?.getAttribute('src'),
  };

  const videoLinkObject = {
    desktop: desktopVidPath?.textContent,
    mobile: mobileVidPath?.textContent,
  };
  // block.textContent = '';
  const control = videoControl?.textContent.trim() === 'true';
  const loop = videoLoop?.textContent.trim() === 'true';
  const autoplay = videoAutoPlay?.textContent.trim() === 'true';
  const mute = videoMute?.textContent.trim() === 'true';
  imageButtonElement.ariaLabel = imageButtonName.textContent;
  videoButtonElement.ariaLabel = videoButtonName.textContent;
  const videoButtonAnchor = videoButtonElement.querySelector('a');
  videoButtonAnchor.textContent = videoButtonName.textContent;
  videoButtonAnchor.title = videoButtonName.textContent;
}
