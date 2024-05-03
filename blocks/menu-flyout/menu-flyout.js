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
    const [, menuTeaserContent, , linkListContent] = panel.children;

    if (menuTeaserContent) {
      const classesText = menuTeaserContent?.textContent.trim();
      const classes = (classesText ? classesText.split(',') : []).map((c) => c?.trim()).filter((c) => !!c);

      if ([...classes].includes('menu-teaser')) {
        const props = [...panel.children].map((row) => row.firstElementChild);
        panel.textContent = '';
        panel.append(generateMenuTeaserDOM(props));
        panel.classList.add('container-menu-teaser');
        panelContainer.append(panel);
      }
    }

    if (linkListContent) {
      const classesText = linkListContent?.textContent.trim();
      const classes = (classesText ? classesText.split(',') : []).map((c) => c?.trim()).filter((c) => !!c);

      if ([...classes].includes('link-list')) {
        const props = [...panel.children].map((row) => row.firstElementChild);
        panel.textContent = '';
        panel.append(generateHeaderLinkList(props));
        panel.classList.add('container-link-list');
        panelContainer.append(panel);
      }
    }
  });
  const flyoutWrapper = document.createElement('div');
  flyoutWrapper.classList.add('flyout-wrapper');
  const menuPropsText = menuFlyoutProps[0].textContent;
  const sanitizedClassName = menuPropsText.replace(/\s+/g, '-');
  flyoutWrapper.classList.add(sanitizedClassName.toLowerCase());
  flyoutWrapper.appendChild(panelContainer);

  block.textContent = '';
  block.append(menuFlyoutDom);
  block.append(flyoutWrapper);
}
