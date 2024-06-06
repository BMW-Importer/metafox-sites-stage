export default function decorate(block) {
  const generalTabSelector = block.querySelectorAll('p');
  const [boldText, paragraphText] = generalTabSelector;
  const subNavContainer = document.createElement('div');
  subNavContainer.classList.add('subnav-text');
  const strongTextContainer = document.createElement('strong');
  strongTextContainer.append(boldText?.textContent);
  subNavContainer.append(strongTextContainer);
  if (paragraphText) {
    subNavContainer.append(paragraphText?.textContent);
  }
  block.replaceChildren(subNavContainer);
}
