export function createTabs($block) {
  const $ul = $block.querySelector('ul');
  if (!$ul) {
    return null;
  }
  /** @type TabInfo[] */
  const tabs = [...$ul.querySelectorAll('li')].map(($li) => {
    const title = $li.textContent;
    const name = title.trim();
    return {
      title,
      name,
      $tab: $li,
    };
  });
    // move $ul below section div
  $block.replaceChildren($ul);

  // search referenced sections and move them inside the tab-container
  const $sections = document.querySelectorAll('[data-contentnavigation="true"]');

  // move the tab's sections before the tab riders.
  [...$sections].forEach(($tabContent) => {
    const name = $tabContent.dataset.tabLabel;
    const tabsVariation = $tabContent.dataset.tabStyle;
    const tabsVariationName = tabsVariation === 'secondary' ? 'default-tab' : 'buttons-tab';
    const tab = tabs.find((t) => t.name === name);
    if (tab) {
      $tabContent.classList.add('tab-item', 'hidden');
      tab.$content = $tabContent;
      $ul.classList.add(tabsVariationName);
      $ul.setAttribute('aria-label', 'Tab description');
    }
  });
  return tabs;
}

export function setSmoothScroll($button, $block) {
  const buttonWidth = $button.clientWidth;
  const scrollableList = $block.querySelector('ul');
  const buttonLeftPos = $button.offsetLeft - scrollableList.offsetLeft;
  const leftPosition = (buttonLeftPos + 2 * buttonWidth) - scrollableList.clientWidth;
  const scrollPos = scrollableList.scrollLeft;
  if (buttonLeftPos < scrollableList.clientWidth
    && scrollPos > 0) {
    $block.querySelector('ul').scrollTo({
      left: buttonLeftPos - 2 * buttonWidth,
      behavior: 'smooth',
    });
  } else if (leftPosition >= 0) {
    $block.querySelector('ul').scrollTo({
      left: scrollPos + 2 * buttonWidth,
      behavior: 'smooth',
    });
  }
}

export function maskTabElems(ev, $block) {
  const self = $block.querySelector('ul');
  const curPos = self.scrollLeft;
  if (curPos === 0) {
    $block.classList.add('mask-right');
    $block.classList.remove('mask-left');
  } else {
    const max = self.scrollWidth - self.clientWidth;
    if (curPos + 1 >= max) {
      if (max >= 0) {
        $block.classList.add('mask-left');
        $block.classList.remove('mask-right');
      } else {
        $block.classList.add('mask-left', 'mask-right');
      }
    } else {
      $block.classList.add('mask-left', 'mask-right');
    }
  }
}

export default function decorate($block) {
  const tabs = createTabs($block);
  const scrollableElem = $block.querySelector('ul');

  tabs.forEach((tab, index) => {
    const $button = document.createElement('button');
    const { $tab, title, name } = tab;
    $button.textContent = title;
    $button.setAttribute('data-tab-index', index);
    $tab.replaceChildren($button);

    tab.$content.setAttribute('data-tab-index', index);

    $button.addEventListener('click', () => {
      const $activeButton = $block.querySelector('button.active');

      if ($activeButton !== $tab) {
        $activeButton.classList.remove('active');
        $button.classList.add('active');
        const blockPosition = $block.getBoundingClientRect().top;
        const offsetPosition = blockPosition + window.scrollY - 80;
        setSmoothScroll($button, $block);

        tabs.forEach((t) => {
          if (name === t.name) {
            t.$content.classList.remove('hidden');
          } else {
            t.$content.classList.add('hidden');
          }
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        });
      }
    });

    if (index === 0) {
      $button.classList.add('active');
      tab.$content.classList.remove('hidden');
    }
  });
  setTimeout(() => {
    if (scrollableElem.scrollWidth > scrollableElem.clientWidth) {
      $block.classList.add('mask-right');
    }
  }, 1000);

  scrollableElem.addEventListener('scroll', (ev) => {
    maskTabElems(ev, $block);
  });
}
