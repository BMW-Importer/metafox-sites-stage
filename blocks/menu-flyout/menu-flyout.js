import { generateMenuTeaserDOM } from '../menu-teaser/menu-teaser.js';
import { generateHeaderLinkList } from '../link-list/link-list.js';

function generateMenuFlyoutLink(props) {
  const [menuflyoutText] = props;

  // fetch menuflyout line text property value
  const menuFlyourTitle = menuflyoutText.textContent;

  // select p tag present in the props
  const menuFlyoutDom = menuflyoutText.querySelector('p');

  const spanTag = document.createElement('span');
  spanTag.id = menuFlyourTitle;
  spanTag.classList.add('menu-flyout-link');
  spanTag.textContent = menuFlyourTitle;

  menuFlyoutDom.textContent = '';
  menuFlyoutDom.append(spanTag);

  return menuFlyoutDom;
}

export default function decorate(block) {
  const panelContainer = document.createElement('div');
  panelContainer.classList.add('flyout-main-container');

  // get all children elements
  const panels = [...block.children];

  // get menu fly out properties
  const menuFlyoutProps = [...block.children].map((row) => row.firstElementChild);
  const menuFlyoutDom = generateMenuFlyoutLink(menuFlyoutProps);

  // loop through all children blocks
  [...panels].forEach((panel) => {
    // generate the  panel
    const [, f2, , f4] = panel.children;

    if (f2) {
      const classesText = f2?.textContent.trim();
      const classes = (classesText ? classesText.split(',') : []).map((c) => c?.trim()).filter((c) => !!c);

      if ([...classes].includes('menu-teaser')) {
        const props = [...panel.children].map((row) => row.firstElementChild);
        panel.textContent = '';
        panel.append(generateMenuTeaserDOM(props));
        panelContainer.append(panel);
      }
    }

    if (f4) {
      const classesText = f4?.textContent.trim();
      const classes = (classesText ? classesText.split(',') : []).map((c) => c?.trim()).filter((c) => !!c);

      if ([...classes].includes('link-list')) {
        const props = [...panel.children].map((row) => row.firstElementChild);
        panel.textContent = '';
        panel.append(generateHeaderLinkList(props));
        panelContainer.append(panel);
      }
    }
  });
  block.textContent = '';
  block.append(menuFlyoutDom);
  block.append(panelContainer);
}
