import {
  getTechnicalSpreadsheetData,
} from '../../scripts/common/wdh-util.js';

let savedFilterTypesJson = [];

function filterCloseBtnClick(button) {
  button.addEventListener('click', () => {
    button.closest('.filter-overlay-wrap').querySelector('.filter-overlay').classList.add('filter-overlay-hidden');
  });
}

function filterClearBtnClick(button) {
  button.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.filter-overlay input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  });
}

function renderfilterPopoverData(overlayContainer) {
  const filterPopoverOverlay = document.createElement('div');
  filterPopoverOverlay.classList.add('filter-overlay', 'filter-overlay-hidden');
  const filterPopoverContent = document.createElement('div');
  filterPopoverContent.classList.add('filter-content');
  const filterPopoverHeader = document.createElement('h3');
  filterPopoverHeader.classList.add('filter-heading');
  filterPopoverHeader.textContent = 'FILTER';
  filterPopoverContent.append(filterPopoverHeader);
  const groupedFilterData = {};
  if (savedFilterTypesJson) {
    const lang = document.querySelector('meta[name="language"]').content;
    savedFilterTypesJson.forEach((obj) => {
      const filterType = (lang === 'en') ? obj['Filter Type English'] : obj['Filter Type Serbian'];
      const filterName = (lang === 'en') ? obj['Filter Name English'] : obj['Filter Name Serbian'];
      const filterCode = obj['Filter Code'];
      if (!groupedFilterData[filterType]) {
        groupedFilterData[filterType] = [];
      }
      groupedFilterData[filterType].push({
        filterType,
        filterName,
        filterCode,
      });
    });
  }

  if (groupedFilterData) {
    const filterPopoverBody = document.createElement('div');
    filterPopoverBody.classList.add('filter-body');
    Object.entries(groupedFilterData).forEach(([filterType]) => {
      const filterGroupDiv = document.createElement('fieldset');
      filterGroupDiv.classList.add('filter-group');
      const filterGroupHeading = document.createElement('legend');
      filterGroupHeading.classList.add('filter-group-heading');
      filterGroupHeading.textContent = filterType;
      filterGroupDiv.append(filterGroupHeading);
      const filterGroupBody = document.createElement('div');
      filterGroupBody.classList.add('filter-group-body');
      const filterArray = groupedFilterData[filterType];
      filterArray.forEach((filter) => {
        const filterCheckbox = document.createElement('div');
        filterCheckbox.classList.add('filter-checkbox');
        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.setAttribute('id', filter.filterName);
        const checkboxIcon = document.createElement('span');
        checkboxIcon.className = 'filter-checkbox-icon';
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', filter.filterName);
        checkboxLabel.textContent = filter.filterName;
        filterCheckbox.append(checkboxInput, checkboxIcon, checkboxLabel);
        filterGroupBody.append(filterCheckbox);
      });
      filterGroupDiv.append(filterGroupBody);
      filterPopoverBody.append(filterGroupDiv);
    });
    filterPopoverContent.append(filterPopoverBody);
    filterPopoverOverlay.append(filterPopoverContent);
  }
  const filterPopoverFooter = document.createElement('div');
  filterPopoverFooter.classList.add('filter-footer');

  const showResultButton = document.createElement('button');
  showResultButton.classList.add('show-filter-btn');
  showResultButton.innerHTML = '<span class="btn-text">Show results (99)</span>';

  const clearButton = document.createElement('button');
  clearButton.classList.add('clear-filter-btn');
  clearButton.innerHTML = '<span class="filter-trash-icon" data-icon="trash_can"></span><span class="btn-text">Clear the filter</span>';
  filterClearBtnClick(clearButton);

  filterPopoverFooter.append(showResultButton);
  filterPopoverFooter.append(clearButton);
  filterPopoverContent.append(filterPopoverFooter);
  const closeButton = document.createElement('button');
  closeButton.classList.add('filter-close-button');
  closeButton.setAttribute('type', 'button');
  filterPopoverContent.append(closeButton);
  filterCloseBtnClick(closeButton);
  overlayContainer.append(filterPopoverOverlay);
}

function showMoreBtnClick(button) {
  button.addEventListener('click', () => {
    button.closest('.filter-overlay-wrap').querySelector('.filter-overlay').classList.remove('filter-overlay-hidden');
  });
}

function selectModelClick(button) {
  button.addEventListener('click', (e) => {
    const parentElem = e.target.parentElement;
    if (parentElem.localName === 'button') {
      if (!parentElem.firstChild.classList.contains('toggle-icon')) {
        parentElem.firstChild.classList.add('toggle-icon');
        parentElem.style.background = '#4d4d4d';
        parentElem.style.color = '#f6f6f6';
      } else {
        parentElem.firstChild.classList.remove('toggle-icon');
        parentElem.style.background = 'transparent';
        parentElem.style.color = '#666';
      }
    }
  });
}

function toggleNavContent() {
  const selectedButton = document.getElementById('navMenuBtn');
  selectedButton.addEventListener('click', () => {
  });
}

export default async function decorate(block) {
  const [description] = [...block.children];
  // const contentNavDesc = description?.querySelector('h2') || '';
  // const activateConfigVar = description?.querySelector('h3') || '';
  // const filterSpreadsheet = description?.querySelector('h5') || '';
  // const modelOverviewSpreadsheet = description?.querySelector('h6') || '';

  const spreadSheetPath = description?.querySelector('a')?.textContent;
  const spreadSheetFile = description?.querySelector('a')?.getAttribute('href');
  const modifiedSpreadSheetFile = spreadSheetFile.replace('/en', '');
  const origin = window.location.host.match('author-(.*?).adobeaemcloud.com(.*?)') ? `${spreadSheetPath + spreadSheetFile}` : modifiedSpreadSheetFile;
  const spreadSheetResponse = await getTechnicalSpreadsheetData(origin);
  if (spreadSheetResponse) {
    savedFilterTypesJson = spreadSheetResponse.responseJson.data;
  }
  const allModelParentContainer = document.createElement('div');
  allModelParentContainer.classList.add('all-model-parent-div');
  const modelTitle = document.createElement('h2');
  modelTitle.innerHTML = 'Find your BMW';

  const filterTitle = description.querySelector('h4');
  filterTitle.classList.add('filter-title');
  const buttonRow = document.createElement('div');
  buttonRow.classList.add('filter-btn-row');
  const hybridButton = document.createElement('button');
  hybridButton.classList.add('filter-btn');
  hybridButton.innerHTML = '<span class="filter-btn-icon"></span><span class="btn-text">Plug-in Hybrid</span>';
  const electricButton = document.createElement('button');
  electricButton.classList.add('filter-btn');
  electricButton.innerHTML = '<span class="filter-btn-icon"></span><span class="btn-text">Electric</span>';
  const mButton = document.createElement('button');
  mButton.classList.add('filter-btn');
  mButton.innerHTML = '<span class="filter-btn-icon"></span><span class="btn-text">BMW M</span>';
  const iButton = document.createElement('button');
  iButton.classList.add('filter-btn');
  iButton.innerHTML = '<span class="filter-btn-icon"></span><span class="btn-text">BMW i</span>';
  const overlayContainer = document.createElement('div');
  overlayContainer.classList.add('filter-overlay-wrap');
  const showMoreButton = document.createElement('button');
  showMoreButton.classList.add('show-more-btn');
  showMoreButton.innerHTML = '<span class="show-more-icon"></span><span class="show-more-text">Show more filters</span>';
  const numberWrap = document.createElement('div');
  numberWrap.classList.add('number-wrap');
  numberWrap.innerHTML = '<span class="total-number">99</span>&nbsp;<span class="found-text">found vehicles</span>';
  const leftBtn = document.createElement('button');
  leftBtn.classList.add('nav-arrow-left');
  const rightBtn = document.createElement('button');
  rightBtn.classList.add('nav-arrow-right');
  const navBar = document.createElement('div');
  navBar.classList.add('content-navigation');
  navBar.innerHTML = `
  <button class='content-nav-selected-value' id='navMenuBtn'>BMW i</button>
  <div class='nav-background'></div>
  <div class='nav-arrow-left'></div>
  <div class="nav-arrow-right"></div>
    <nav class='navbar-wrap'>
      <ul class='nav-list'>
        <li class='nav-list-item'>
          <button class='nav-list-button'>BMW i</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>X</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>M</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>8</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>7</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>6</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>5</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>4</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>3</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>2</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>1</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>Z4</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>Concept cars</button>
        </li>
        <li class='nav-list-item'>
          <button class='nav-list-button'>Protection Vehicles</button>
        </li>
      </ul>
    </nav>
  `;

  buttonRow.append(hybridButton);
  buttonRow.append(electricButton);
  buttonRow.append(mButton);
  buttonRow.append(iButton);
  overlayContainer.append(showMoreButton);
  renderfilterPopoverData(overlayContainer);

  allModelParentContainer.append(modelTitle);
  allModelParentContainer.append(filterTitle);
  allModelParentContainer.append(buttonRow);
  allModelParentContainer.append(overlayContainer);
  allModelParentContainer.append(numberWrap);
  allModelParentContainer.append(navBar);
  block.append(allModelParentContainer);
  selectModelClick(hybridButton);
  selectModelClick(electricButton);
  selectModelClick(mButton);
  selectModelClick(iButton);

  showMoreBtnClick(showMoreButton);

  toggleNavContent();
}
