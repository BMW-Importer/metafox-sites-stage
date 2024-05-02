import { readBlockConfig, toCamelCase, toClassName } from './aem.js';

const alignClassList = { center: 'alignment-center', right: 'alignment-right', left: 'alignment-left' };

const flexSectionAlignClassList = ['center', 'left', 'right'];

function getAlignmentStyle(element, selector) {
  let alignClass = '';
  element.querySelectorAll(selector).forEach((childElemet) => {
    childElemet.classList.forEach((className) => {
      if (className.includes('alignment-')) {
        alignClass = className;
      }
    });
  });
  return alignClass;
}

function setAlignmentStyle(style, element) {
  if (alignClassList.left === style) {
    element.classList.add('button-align-left');
  } else if (alignClassList.right === style) {
    element.classList.add('button-align-right');
  } else {
    element.classList.add('button-align-center');
  }
}

function addIcon(element, iconType, className = '') {
  if (iconType === 'arrow_chevron_right') {
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = '<i class="icon-gt" aria-hidden="true" data-icon="arrow_chevron_right"></i>';
    iconSpan.classList = className;
    element.append(iconSpan);
  }
}

function addClass(callElement, bindElemet, eventName, className) {
  callElement.addEventListener(eventName, () => {
    bindElemet.classList.add(className);
  });
}

function removeClass(callElement, bindElemet, eventName, className) {
  callElement.addEventListener(eventName, () => {
    bindElemet.classList.remove(className);
  });
}

function getSectionAlignmentClass(element, selector) {
  let sectionAlignment = '';
  element.querySelectorAll(selector).forEach((childElemet) => {
    childElemet.classList.forEach((className) => {
      if (flexSectionAlignClassList.includes(className)) {
        sectionAlignment = className;
      }
    });
  });
  return sectionAlignment;
}

function decorateBMWButtons(element) {
  element.querySelectorAll('a').forEach((a) => {
    a.title = a.title || a.textContent;
    if (a.href !== a.textContent) {
      const up = a.parentElement;
      const twoup = a.parentElement.parentElement;
      if (!a.querySelector('img')) {
        if (
          up.childNodes.length === 1 && (up.tagName === 'P' || up.tagName === 'DIV')
        ) {
          // default
          up.ariaLabel = up.textContent;
          a.className = '';
          const alignment = getAlignmentStyle(element, 'div.section');
          setAlignmentStyle(alignment, up);
        }
        if (
          up.childNodes.length === 1 && up.tagName === 'STRONG' && twoup.childNodes.length === 1 && (twoup.tagName === 'P' || twoup.tagName === 'DIV')
        ) {
          a.className = 'button ghost-dark button-fixed-width';
          up.ariaLabel = up.textContent;
          twoup.classList.add('button-container');
          const alignment = getAlignmentStyle(element, 'div.section');
          setAlignmentStyle(alignment, twoup);
        }
        if (
          up.childNodes.length === 1 && up.tagName === 'EM' && twoup.childNodes.length === 1 && (twoup.tagName === 'P' || twoup.tagName === 'DIV')
        ) {
          a.className = 'button hyperlink';
          twoup.ariaLabel = up.textContent;
          twoup.classList.add('button-container');
          up.classList.add('align-icon');
          const alignment = getAlignmentStyle(element, 'div.section');
          setAlignmentStyle(alignment, twoup);
          addIcon(up, 'arrow_chevron_right', 'align-center');
          addClass(a, twoup, 'mouseover', 'align-icon-hover');
          removeClass(a, twoup, 'mouseout', 'align-icon-hover');
        }
      }
    }
  });
}

function decorateBMWSections(element) {
  element.querySelectorAll(':scope > div:not([data-section-status])').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';

    // Process section metadata
    const sectionMeta = section.querySelector('div.section-metadata');
    const sectionAlignmentClass = getSectionAlignmentClass(section, 'div.section-metadata');

    if (sectionAlignmentClass) {
      section.classList.add(sectionAlignmentClass);
    }

    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          const styles = meta.style
            .split(',')
            .filter((style) => style)
            .map((style) => toClassName(style.trim()));
          styles.forEach((style) => section.classList.add(style));
        } else if (key === 'sectiontopmargin') {
          if (meta.sectiontopmargin === 'true') {
            section.classList.add('flex-top-margin');
          }
        } else {
          section.dataset[toCamelCase(key)] = meta[key];
        }
      });
      sectionMeta.parentNode.remove();
    }
  });
}

export {
  decorateBMWButtons,
  decorateBMWSections,
};
