import {
  getTechnicalSpreadsheetData,
} from '../../scripts/common/wdh-util.js';

// delete - dummy json's - start
const filterJsonApiResponse = {
  "total": 7,
  "offset": 0,
  "limit": 7,
  "data": [
    {
      "Filter Type English": "Body Type",
      "Filter Type Serbian": "Tip karoserije",
      "Filter Name English": "Sedan",
      "Filter Name Serbian": "Sedan",
      "Filter Code": ""
    },
    {
      "Filter Type English": "Body Type",
      "Filter Type Serbian": "Tip karoserije",
      "Filter Name English": "SUV",
      "Filter Name Serbian": "SUV",
      "Filter Code": "",
      "Is Default In Screen": true,
      "isSelected": true
    },
    {
      "Filter Type English": "Body Type",
      "Filter Type Serbian": "Tip karoserije",
      "Filter Name English": "Hatchback",
      "Filter Name Serbian": "Hatchback",
      "Filter Code": "",
      "Is Default In Screen": true
    },
    {
      "Filter Type English": "Fuel Type",
      "Filter Type Serbian": "Fuel Type",
      "Filter Name English": "Gasoline",
      "Filter Name Serbian": "Benzene",
      "Filter Code": "O"
    },
    {
      "Filter Type English": "Fuel Type",
      "Filter Type Serbian": "Fuel Type",
      "Filter Name English": "Diesel",
      "Filter Name Serbian": "Dizel",
      "Filter Code": "D",
    },
    {
      "Filter Type English": "Fuel Type",
      "Filter Type Serbian": "Fuel Type",
      "Filter Name English": "Plugin Hybrid",
      "Filter Name Serbian": "Plugin Hi-Brid",
      "Filter Code": "X",
      "Is Default In Screen": true,
      "isSelected": true
    },
    {
      "Filter Type English": "Fuel Type",
      "Filter Type Serbian": "Fuel Type",
      "Filter Name English": "Electric",
      "Filter Name Serbian": "Električni",
      "Filter Code": "E",
      "Is Default In Screen": true,
      "isSelected": false
    }
  ],
  ":type": "sheet"
};

const allModelOverViewApiResponse = {
  "total": 4,
  "offset": 0,
  "limit": 4,
  "data": [
    {
      "Model Name": "BMW i5",
      "Category/Group": "i",
      "Analytics": "",
      "Model Code": "7K11",
      "Price": "9812734",
      "Sub brand Icon": "i",
      "New Label": "true",
      "Fuel Type": "O",
      "Body Type": "Sedan",
      "Show More Button": "true",
      "Show More Button Link": "https://www.bmw.rs/sr/all-models/bmw-i/i5/bmw-i5-pregled.html",
      "Configurator Button": "true",
      "Stock Locator Button": "true"
    },
    {
      "Model Name": "BMW 5 Series 5 Sedan",
      "Category/Group": "5",
      "Analytics": "",
      "Model Code": "7K12",
      "Price": "1234",
      "Sub brand Icon": "M",
      "New Label": "true",
      "Fuel Type": "O, D",
      "Body Type": "Sedan",
      "Show More Button": "true",
      "Show More Button Link": "https://www.bmw.rs/sr/all-models/bmw-serija-5-pregled/sedan/bmw-serija-5-limuzina-pregled.html",
      "Configurator Button": "true",
      "Stock Locator Button": "true"
    },
    {
      "Model Name": "BMW iX",
      "Category/Group": "i,X",
      "Analytics": "",
      "Model Code": "7K31",
      "Price": "1234",
      "Sub brand Icon": "i",
      "New Label": "false",
      "Fuel Type": "O, D",
      "Body Type": "SUV",
      "Show More Button": "true",
      "Show More Button Link": "https://www.bmw.rs/sr/all-models/bmw-i/bmw-ix/2021/bmw-ix.html",
      "Configurator Button": "true",
      "Stock Locator Button": ""
    },
    {
      "Model Name": "BMW M5 Series Sedan",
      "Category/Group": "5,M",
      "Analytics": "",
      "Model Code": "10FK",
      "Price": "2346233",
      "Sub brand Icon": "M",
      "New Label": "true",
      "Fuel Type": "O,D,X",
      "Body Type": "Sedan",
      "Show More Button": "true",
      "Show More Button Link": "https://www.bmw.rs/sr/all-models/m-series/m5-series/bmw-m5-sedan.html",
      "Configurator Button": "true",
      "Stock Locator Button": "true"
    }
  ],
  ":type": "sheet"
}
// delete - dummy json's - end

let savedFilterTypesJson = [];
const allModelFilterJson = {};
const allModelOverviewJson = {};
const authorPageRegex = /author-(.*?)\.adobeaemcloud\.com(.*?)/;

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

// ------------------------- bharath Code Start -------------------------------

function generateAllModelUi(block) {
  // loop through filter json to find which are options whch are selected 
  const listOfSelectedOptions;

  // loop through global model overview json and filter it based on selections

  //generate UI
}

// function to generate filter popui based on filter json
function generateFilterPopup(block) {
  const filterOverLay = block.querySelector('.filter-overlay-wrap');
  const bodyTypeFilters = filterOverLay.querySelector('.body-type-filter-options');
  bodyTypeFilters.textContent = '';

  const fuelTypeOptions = filterOverLay.querySelector('.fuel-type-filter-options');
  fuelTypeOptions.textContent = '';
  
  allModelFilterJson.forEach((options) => {
    // if isSelected then filter option is selected by user previously
    if (options['Filter Type English'] === 'Body Type') {
      const isSelected = options['isSelected'];
      const optionDiv = document.createElement('div');
      const inputElem = document.createElement('input');

      bodyTypeFilters.append(optionDiv);

    } else if (options['Filter Type English'] === 'Fuel Type') {
      
    }
  });
}


// function to generate selected filter options in UI
function generateSelectedFilterOptions(block) {
  const buttonRow = block.querySelector('.filter-btn-row');

  // if children is present then UI is already loaded,
  // so now toggle active class to default filter &
  // append selected filter options as buttons
  if (buttonRow.children) { 
    allModelFilterJson.forEach((options) => {
      if (options['Is Default In Screen']) {
        if (options['isSelected']) {
          const btn = document.createElement('button');
          btn.textContent = options[];
          buttonRow.append(btn);
        } else {
          
        }
      } else {

      }
    });
  } else {

  }

  // function to generate navigation bar

  // function to generate all model ui based on filter selection
  generateAllModelUi(block);
}

// function to display filter overlay popup
function enableShowMoreBtnClickEvent(showMoreBtn) {
  showMoreBtn.addEventListener('click', (e) => {
    const parentDiv = e.target.closest('.all-model-parent-div');
    const filterOverLay = parentDiv?.querySelector('.filter-overlay-wrap');
    if (filterOverLay) {
      filterOverLay.toggle('active');

      if (filterOverLay.classList.contains('active')) generateFilterPopup(parentDiv);
    }    
  });
}

async function getSpreadSheetData(type, prop) {
  try {
    // const spreadSheetPath = prop?.querySelector('a')?.textContent;
    // const spreadSheetFile = prop?.querySelector('a')?.getAttribute('href');

    // const isMatch = authorPageRegex.exec(window.location.host);
    // const origin = isMatch ? `${spreadSheetPath}.json` : spreadSheetFile;

    // const spreadSheetResponse = await getTechnicalSpreadsheetData(origin);

    // if (spreadSheetResponse) {
    //   if (type === 'filter') {
    //     allModelFilterJson.data = spreadSheetResponse?.data || [];
    //   } else {
    //     allModelOverviewJson.data = spreadSheetResponse?.data || [];
    //   }      
    // }

    if (type === 'filter') {
      allModelFilterJson.data = filterJsonApiResponse?.data || [];
    } else {
      allModelOverviewJson.data = allModelOverViewApiResponse?.data || [];
    }
  } catch (e) {
    console.error(e);
  }
}

export default async function decorate(block) {
  const [description, modelSpreadSheet] = [...block.children];

  await getSpreadSheetData('filter', description);

  await getSpreadSheetData('all-model', modelSpreadSheet);

  block.textContent = '';

  const allModelParentContainer = document.createElement('div');
  allModelParentContainer.classList.add('all-model-parent-div');

  const modelTitle = document.createElement('h2');
  modelTitle.innerHTML = 'Find your BMW';
  allModelParentContainer.append(modelTitle);

  const filterTitle = description.querySelector('h4');
  filterTitle.classList.add('filter-title');
  allModelParentContainer.append(filterTitle);

  const buttonRow = document.createElement('div');
  buttonRow.classList.add('filter-btn-row');
  allModelParentContainer.append(buttonRow);

  const showMoreButton = document.createElement('button');
  showMoreButton.classList.add('show-more-btn');
  showMoreButton.innerHTML = '<span class="show-more-icon"></span><span class="show-more-text">Show more filters</span>';
  enableShowMoreBtnClickEvent(showMoreButton);
  allModelParentContainer.append(showMoreButton);

  const overlayContainer = document.createElement('div');
  overlayContainer.classList.add('filter-overlay-wrap');
  allModelParentContainer.append(overlayContainer);

  const numberWrap = document.createElement('div');
  numberWrap.classList.add('number-wrap');
  numberWrap.innerHTML = '<span class="total-number">99</span>&nbsp;<span class="found-text">found vehicles</span>';
  allModelParentContainer.append(numberWrap);

  const navBar = document.createElement('div');
  navBar.classList.add('content-navigation');
  allModelParentContainer.append(navBar);

  block.append(allModelParentContainer);

  generateSelectedFilterOptions(block);  

  //------------------------------------------ CODE ENDS HERE --------------------------------------------------------




  const spreadSheetPath = description?.querySelector('a')?.textContent;
  const spreadSheetFile = description?.querySelector('a')?.getAttribute('href');
  const modifiedSpreadSheetFile = spreadSheetFile.replace('/en', '');
  const origin = window.location.host.match('author-(.*?).adobeaemcloud.com(.*?)') ? `${spreadSheetPath + spreadSheetFile}` : modifiedSpreadSheetFile;
  const spreadSheetResponse = await getTechnicalSpreadsheetData(origin);
  if (spreadSheetResponse) {
    savedFilterTypesJson = spreadSheetResponse.responseJson.data;
  }

  

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

  
  
 

  const leftBtn = document.createElement('button');
  leftBtn.classList.add('nav-arrow-left');
  const rightBtn = document.createElement('button');
  rightBtn.classList.add('nav-arrow-right');

  
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
