export default function decorate(block) {
  const [, analytics] = block.children;
  const [analyticsLabel] = analytics.querySelectorAll('p');
  const anchorEle = block.querySelector('a');
  block.removeChild(analytics);
  if (anchorEle) {
    const { blockName } = anchorEle.closest('.block').dataset;
    const sectionId = anchorEle.closest('.section').dataset.analyticsLabel;
    anchorEle.target = '_blank';
    anchorEle.dataset.analyticsLinkType = 'download';
    anchorEle.dataset.analyticsCustomClick = 'true';
    if (blockName) {
      anchorEle.dataset.analyticsBlockName = blockName;
    }
    if (sectionId) {
      anchorEle.dataset.analyticsSectionId = sectionId;
    }
    if (analyticsLabel) {
      anchorEle.dataset.analyticsLabel = analyticsLabel?.textContent || '';
    }
    const linkLabel = anchorEle?.textContent?.trim() || '';
    if (linkLabel) {
      anchorEle.dataset.analyticsLinkLabel = linkLabel;
    }
  }
}
