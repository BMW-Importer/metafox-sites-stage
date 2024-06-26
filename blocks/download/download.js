export default function decorate(block) {
  const anchorEle = block.querySelector('a');
  if (anchorEle) {
    const linkUrl = anchorEle.href.toLowerCase();
    const fileExtension = getFileType(linkUrl);
    const linkName = getFileName(linkUrl);
    const { blockName }= anchorEle.closest('.block').dataset;
    const sectionId = anchorEle.closest('.section').dataset.analyticsLabel;
    anchorEle.target = '_blank';
    anchorEle.dataset.analyticsCategory = 'Download';
    anchorEle.dataset.analyticsCustomClick = 'true';
    if(fileExtension) {
      anchorEle.dataset.analyticsSubCategory = fileExtension;
    }
    if(blockName){
      anchorEle.dataset.analyticsBlockName = blockName;
    }
    if(sectionId){
      anchorEle.dataset.analyticsSectionId = sectionId
    }
    if(linkName){
      anchorEle.dataset.analyticsLinkName = linkName;
    }
  }
  function getFileType(url) {
    const lastDotPosition = url.lastIndexOf('.');
    if (lastDotPosition === -1) {
        return '';
    }
    return url.substring(lastDotPosition + 1);
  }
  function getFileName(url) {
    const lastSlashPosition = url.lastIndexOf('/');
    return url.substring(lastSlashPosition + 1);
  }
}
