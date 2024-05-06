export function generateImgSlidePicture(props) {
  const [imgDOMContainer, imageSlideImgRef, imageSlideAltText] = props;
  const propImgElem = imageSlideImgRef.querySelector('img');
  const pictureElement = document.createElement('picture');
  const imgElem = document.createElement('img');
  imgElem.src = propImgElem.src;
  imgElem.setAttribute('alt', imageSlideAltText);

  pictureElement.append(imgElem);
  imgDOMContainer.append(pictureElement);
}

export function generateImgSlideDetailMarkUp(props) {
  const [imageSlideHeadline, imageSlideCopyText, imgSlideBtn, index] = props;

  const videoImgDetailDOMContainer = document.createElement('div');
  videoImgDetailDOMContainer.classList.add('vid-img-slide');
  videoImgDetailDOMContainer.classList.add(`vid-img-slide-${index}`);
  videoImgDetailDOMContainer.classList.add('detail');

  // desktop view collapsed state detail cover
  const vidImgDetailCover = document.createElement('div');
  vidImgDetailCover.classList.add('vid-img-slide-cover');
  const vidImgDetailCoverTitle = document.createElement('h3');
  vidImgDetailCoverTitle.classList.add('vid-img-slide-cover-title');
  vidImgDetailCoverTitle.textContent = imageSlideHeadline;
  vidImgDetailCover.append(vidImgDetailCoverTitle);

  // desktop, tab and mobile open state detail cover
  const vidImgDetailExpandedCover = document.createElement('div');
  vidImgDetailExpandedCover.classList.add('vid-img-slide-expand-cover');
  const vidImgDetailExpandTitle = document.createElement('h3');
  vidImgDetailExpandTitle.classList.add('vid-img-slide-expand-title');
  vidImgDetailExpandTitle.textContent = imageSlideHeadline;
  const vidImgDetailExpandDesp = document.createElement('p');
  vidImgDetailExpandDesp.classList.add('vid-img-slide-expand-descp');
  vidImgDetailExpandDesp.textContent = imageSlideCopyText.firstChild.innerHTML;

  const vidImgDetailLinkBtn = imgSlideBtn.querySelector('p');
  vidImgDetailLinkBtn.classList.add('vid-img-slide-link-btn');

  const vidImgDetailAnchorElm = vidImgDetailLinkBtn.querySelector('a');

  const anchorElem = document.createElement('a');
  anchorElem.href = vidImgDetailAnchorElm.href;
  anchorElem.classList = vidImgDetailAnchorElm.classList;
  anchorElem.textContent = vidImgDetailAnchorElm.textContent;

  if (vidImgDetailLinkBtn.querySelector('strong')) {
    vidImgDetailLinkBtn.querySelector('strong').textContent = '';
    vidImgDetailLinkBtn.querySelector('strong').append(anchorElem);
  } else if (vidImgDetailLinkBtn.querySelector('em')) {
    vidImgDetailLinkBtn.querySelector('em').textContent = '';
    vidImgDetailLinkBtn.querySelector('em').append(anchorElem);
  }

  const showMoreShowLessBtnContainer = document.createElement('div');
  showMoreShowLessBtnContainer.classList.add('vid-img-slide-showmore-btn', 'hidden');
  const showMoreShowLessBtn = document.createElement('button');
  showMoreShowLessBtn.textContent = 'Prikaži manje';
  showMoreShowLessBtn.classList.add('vid-img-slide-showmore-btn-link');
  showMoreShowLessBtnContainer.append(showMoreShowLessBtn);

  vidImgDetailExpandedCover.append(vidImgDetailExpandTitle);
  vidImgDetailExpandedCover.append(vidImgDetailExpandDesp);
  vidImgDetailExpandedCover.append(vidImgDetailLinkBtn);
  vidImgDetailExpandedCover.append(showMoreShowLessBtnContainer);
  videoImgDetailDOMContainer.append(vidImgDetailCover);
  videoImgDetailDOMContainer.append(vidImgDetailExpandedCover);
  return videoImgDetailDOMContainer;
}
