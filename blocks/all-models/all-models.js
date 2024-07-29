import {
  getTechnicalSpreadsheetData,
} from '../../scripts/common/wdh-util.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

// delete - dummy json's - start
const filterJsonApiResponse = {
  total: 7,
  offset: 0,
  limit: 7,
  data: [
    {
      'Filter Type English': 'Body Type',
      'Filter Type Serbian': 'Tip karoserije',
      'Filter Name English': 'Sedan',
      'Filter Name Serbian': 'Sedan',
      'Filter Code': 'c',
      'Is Default In Screen': false,
    },
    {
      'Filter Type English': 'Body Type',
      'Filter Type Serbian': 'Tip karoserije',
      'Filter Name English': 'SUV',
      'Filter Name Serbian': 'SUV',
      'Filter Code': 'b',
      'Is Default In Screen': true,
    },
    {
      'Filter Type English': 'Body Type',
      'Filter Type Serbian': 'Tip karoserije',
      'Filter Name English': 'Hatchback',
      'Filter Name Serbian': 'Hatchback',
      'Filter Code': 'a',
      'Is Default In Screen': true,
    },
    {
      'Filter Type English': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Gasoline',
      'Filter Name Serbian': 'Benzene',
      'Filter Code': 'O',
      'Is Default In Screen': false,
    },
    {
      'Filter Type English': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Diesel',
      'Filter Name Serbian': 'Dizel',
      'Filter Code': 'D',
      'Is Default In Screen': false,
    },
    {
      'Filter Type English': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Plugin Hybrid',
      'Filter Name Serbian': 'Plugin Hi-Brid',
      'Filter Code': 'X',
      'Is Default In Screen': true,
    },
    {
      'Filter Type English': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Electric',
      'Filter Name Serbian': 'Električni',
      'Filter Code': 'E',
      'Is Default In Screen': true,
    },
  ],
  ':type': 'sheet',
};

const allModelOverViewApiResponse = {
  total: 4,
  offset: 0,
  limit: 4,
  data: [
    {
      'Model Name': 'BMW i5',
      'Category/Group': 'i',
      Analytics: '',
      'Model Code': '7K11',
      Price: '9812734',
      'Sub brand Icon': 'i',
      'New Label': 'true',
      'Fuel Type': 'O',
      'Body Type': 'Sedan',
      'Show More Button': 'true',
      'Show More Button Link': 'https://www.bmw.rs/sr/all-models/bmw-i/i5/bmw-i5-pregled.html',
      'Configurator Button': 'true',
      'Stock Locator Button': 'true',
    },
    {
      'Model Name': 'BMW 5 Series 5 Sedan',
      'Category/Group': '5',
      Analytics: '',
      'Model Code': '7K12',
      Price: '1234',
      'Sub brand Icon': 'M',
      'New Label': 'true',
      'Fuel Type': 'O, D',
      'Body Type': 'Sedan',
      'Show More Button': 'true',
      'Show More Button Link': 'https://www.bmw.rs/sr/all-models/bmw-serija-5-pregled/sedan/bmw-serija-5-limuzina-pregled.html',
      'Configurator Button': 'true',
      'Stock Locator Button': 'true',
    },
    {
      'Model Name': 'BMW iX',
      'Category/Group': 'i,X',
      Analytics: '',
      'Model Code': '7K31',
      Price: '1234',
      'Sub brand Icon': 'i',
      'New Label': 'false',
      'Fuel Type': 'O, D',
      'Body Type': 'SUV',
      'Show More Button': 'true',
      'Show More Button Link': 'https://www.bmw.rs/sr/all-models/bmw-i/bmw-ix/2021/bmw-ix.html',
      'Configurator Button': 'true',
      'Stock Locator Button': '',
    },
    {
      'Model Name': 'BMW M5 Series Sedan',
      'Category/Group': '5,M',
      Analytics: '',
      'Model Code': '10FK',
      Price: '2346233',
      'Sub brand Icon': 'M',
      'New Label': 'true',
      'Fuel Type': 'O,D,X',
      'Body Type': 'Sedan',
      'Show More Button': 'true',
      'Show More Button Link': 'https://www.bmw.rs/sr/all-models/m-series/m5-series/bmw-m5-sedan.html',
      'Configurator Button': 'true',
      'Stock Locator Button': 'true',
    },
  ],
  ':type': 'sheet',
};
// delete - dummy json's - end

const allModelFilterJson = {};
const allModelOverviewJson = {};
const lang = document.querySelector('meta[name="language"]').content;
const authorPageRegex = /author-(.*?)\.adobeaemcloud\.com(.*?)/;
let placeholders = await fetchPlaceholders(`/${lang}`);

const placeholders2 = {
  allModelCategoryi: 'BMW i',
  allModelCategoryX: 'X',
  allModelCategoryM: 'M',
  allModelCategory8: '8',
  allModelCategory7: '7',
  allModelCategory6: '6',
  allModelCategory5: '5',
  allModelCategory4: '4',
  allModelCategory3: '3',
  allModelCategory2: '2',
  allModelCategory1: '1',
  allModelCategoryZ4: 'Z4',
  allModelFromText: 'From',
};

placeholders = { ...placeholders, ...placeholders2 };

function filterCloseBtnClick(button, showMoreButton) {
  button.addEventListener('click', () => {
    showMoreButton.click();
  });
}

function filterClearBtnClick(button) {
  button.addEventListener('click', (event) => {
    const parentBlock = event.target.closest('.all-model-parent-div');
    allModelFilterJson.data.forEach((item) => item.isSelected = false);
    generateSelectedFilterOptions(parentBlock);
    generateFilterPopup(parentBlock);
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

function generateGroupMarkUp(groupName, allModelfilteredArray) {
  const filterArrayBasedOnCategory = allModelfilteredArray.filter((model) => model['Category/Group'].includes(groupName));

  const bmwiGroup = document.createElement('div');
  bmwiGroup.classList.add('all-model-group-container');

  if (filterArrayBasedOnCategory.length) {
    const bmwiGroupHeading = document.createElement('h2');
    bmwiGroupHeading.classList.add('all-model-group-title');
    bmwiGroupHeading.textContent = placeholders[`allModelCategory${groupName}`];
    bmwiGroup.append(bmwiGroupHeading);

    const listOfModelsContainer = document.createElement('div');
    listOfModelsContainer.classList.add('all-model-group-list');
    bmwiGroup.append(listOfModelsContainer);

    filterArrayBasedOnCategory.forEach((model) => {
      let fuelTypeMarkUp = '';
      const fuelDetails = model['Fuel Type'].split(',');
      fuelDetails.forEach((fuelType, index) => {
        if (index > 0) {
          fuelTypeMarkUp += '<span class=\'all-model-fuel-type\'>•</span>';
        }
        fuelTypeMarkUp += `<span class='all-model-fuel-type'>${placeholders[fuelType?.toLowerCase()?.trim()]}</span>`;
      });

      listOfModelsContainer.insertAdjacentHTML('beforeend', `
    <div class='all-model-card-container'>
      <div class='all-model-card-img-container'>

      </div>
      <button class='all-model-card-btn'></button>
      <div class='all-model-detail-container'>
        <h5 class='all-model-detail-model-name'>${model['Model Name']}</h5>
        <p class='all-model-detail-model-fuel'>${fuelTypeMarkUp}</p>
        <p class='all-model-detail-model-price'>${placeholders.allModelFromText} &nbsp; ${model.Price}</p>
      </div>
    </div>
    `);
    });
  }
  return bmwiGroup;
}

function generateAllModelMarkUp(allModelfilteredArray, block) {
  const allModelContainer = block.querySelector('.all-model-container');
  allModelContainer.textContent = '';

  // bmwi models
  const bmwiGroupMarkUp = generateGroupMarkUp('i', allModelfilteredArray);
  allModelContainer.append(bmwiGroupMarkUp);

  const xGroupMarkUp = generateGroupMarkUp('X', allModelfilteredArray);
  allModelContainer.append(xGroupMarkUp);

  const mGroupMarkUp = generateGroupMarkUp('M', allModelfilteredArray);
  allModelContainer.append(mGroupMarkUp);

  const eightGroupMarkUp = generateGroupMarkUp('8', allModelfilteredArray);
  allModelContainer.append(eightGroupMarkUp);

  const sevenGroupMarkUp = generateGroupMarkUp('7', allModelfilteredArray);
  allModelContainer.append(sevenGroupMarkUp);

  const sixGroupMarkUp = generateGroupMarkUp('6', allModelfilteredArray);
  allModelContainer.append(sixGroupMarkUp);

  const fiveGroupMarkUp = generateGroupMarkUp('5', allModelfilteredArray);
  allModelContainer.append(fiveGroupMarkUp);

  const fourGroupMarkUp = generateGroupMarkUp('4', allModelfilteredArray);
  allModelContainer.append(fourGroupMarkUp);

  const threeGroupMarkUp = generateGroupMarkUp('3', allModelfilteredArray);
  allModelContainer.append(threeGroupMarkUp);

  const twoGroupMarkUp = generateGroupMarkUp('2', allModelfilteredArray);
  allModelContainer.append(twoGroupMarkUp);

  const oneGroupMarkUp = generateGroupMarkUp('1', allModelfilteredArray);
  allModelContainer.append(oneGroupMarkUp);

  const z4GroupMarkUp = generateGroupMarkUp('Z4', allModelfilteredArray);
  allModelContainer.append(z4GroupMarkUp);
}

function generateAllModelUi(block) {
  // loop through filter json to find which are options whch are selected
  const selectedFilterArray = filterJsonApiResponse.data.filter((item) => item.isSelected === true);

  let allModelfilteredArray = {};

  if (selectedFilterArray.length > 0) {
    allModelOverViewApiResponse.data.forEach((item) => {
      selectedFilterArray.forEach((selectedItem) => {
        if ((selectedItem['Filter Type English'] === 'Fuel Type' && item['Fuel Type'].includes(selectedItem['Filter Name English']))
          || (selectedItem['Filter Type English'] === 'Body Type' && item['Body Type'].includes(selectedItem['Filter Name English']))) {
          allModelfilteredArray.push(item);
        }
      });
    });
  } else {
    allModelfilteredArray = allModelOverViewApiResponse.data;
  }

  generateAllModelMarkUp(allModelfilteredArray, block);
}

function generateContentNavigation(block) {
  // function to generate content navigation based on selected filter
}

// function to generate filter popui based on filter json
function generateFilterPopup(block) {
  const filterOverLay = block.querySelector('.filter-overlay-wrap');

  const bodyTypeFiltersOptions = filterOverLay.querySelector('.body-type-filter-options');
  bodyTypeFiltersOptions.textContent = '';

  const fuelTypeFilterOptions = filterOverLay.querySelector('.fuel-type-filter-options');
  fuelTypeFilterOptions.textContent = '';

  allModelFilterJson.data.forEach((options) => {
    // if isSelected then filter option is selected by user previously
    const { isSelected } = options;

    const optionDiv = document.createElement('div');
    optionDiv.classList.add('filter-checkbox');

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('id', options['Filter Code']);

    const checkboxIcon = document.createElement('span');
    checkboxIcon.className = 'filter-checkbox-icon';

    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', options['Filter Code']);
    checkboxLabel.textContent = options['Filter Name English'];

    if (isSelected) checkboxInput.setAttribute('checked', 'true');

    optionDiv.append(checkboxInput, checkboxIcon, checkboxLabel);

    if (options['Filter Type English'] === 'Body Type') {
      bodyTypeFiltersOptions.append(optionDiv);
    } else if (options['Filter Type English'] === 'Fuel Type') {
      fuelTypeFilterOptions.append(optionDiv);
    }
  });
}

// function to generate selected filter options in UI
function generateSelectedFilterOptions(block, filterCode) {
  const buttonRow = block.querySelector('.filter-btn-row');

  if (buttonRow.children.length) {
    const selectedFilterRow = buttonRow.querySelector('.selected-filter-btn-row');

    allModelFilterJson.data.forEach((options) => {
      if (options['Is Default In Screen']) {
        const button = buttonRow.querySelector(`button[data-filter-code='${options['Filter Code']}']`);
        if (options.isSelected) {
          // make default button selected
          button.classList.add('active');
        } else {
          // make default button unselected
          button.classList.remove('active');
        }
      } else if (filterCode === options['Filter Code']) {
        const selectedFilterBtn = selectedFilterRow.querySelector(`button[data-filter-code='${filterCode}']`);
        if (!selectedFilterBtn) {
          const dynFilterButton = document.createElement('button');
          dynFilterButton.classList.add('filter-btn');
          dynFilterButton.classList.add('selected-filter-button');
          dynFilterButton.classList.add('active');
          dynFilterButton.setAttribute('data-filter-type', options['Filter Name English']);
          dynFilterButton.setAttribute('data-filter-option', options['Filter Type English']);
          dynFilterButton.setAttribute('data-filter-code', options['Filter Code']);
          dynFilterButton.setAttribute('type', 'button');
          dynFilterButton.innerHTML = `<span class="filter-btn-icon"></span><span class="btn-text">${options['Filter Name English']}</span>`;
          selectedFilterRow.append(dynFilterButton);
        } else {
          selectedFilterBtn.remove();
        }
      }
    });
    if (!filterCode) {
      selectedFilterRow.innerHTML = '';
    }
  } else {
    // creating div show selected options in filter popup other than default filter btns
    const selectedFilterOptionsRow = document.createElement('div');
    selectedFilterOptionsRow.classList.add('selected-filter-btn-row');

    // loop through filterJsonArray and bind buttons inside buttonRow element
    allModelFilterJson.data.forEach((options) => {
      if (options['Is Default In Screen'] === true) {
        const filterButton = document.createElement('button');
        filterButton.classList.add('filter-btn');
        filterButton.classList.add('default-filter-button');
        filterButton.setAttribute('data-filter-type', options['Filter Name English']);
        filterButton.setAttribute('data-filter-option', options['Filter Type English']);
        filterButton.setAttribute('data-filter-code', options['Filter Code']);
        filterButton.setAttribute('type', 'button');
        if (options.isSelected) filterButton.classList.add('active');
        filterButton.innerHTML = `<span class="filter-btn-icon"></span><span class="btn-text">${options['Filter Name English']}</span>`;
        buttonRow.append(filterButton);
      } else if (options.isSelected) {
        const dynFilterButton = document.createElement('button');
        dynFilterButton.classList.add('filter-btn');
        dynFilterButton.classList.add('selected-filter-button');
        dynFilterButton.classList.add('active');
        dynFilterButton.setAttribute('data-filter-type', options['Filter Name English']);
        dynFilterButton.setAttribute('data-filter-option', options['Filter Type English']);
        dynFilterButton.setAttribute('data-filter-code', options['Filter Code']);
        dynFilterButton.setAttribute('type', 'button');
        dynFilterButton.innerHTML = `<span class="filter-btn-icon"></span><span class="btn-text">${options['Filter Name English']}</span>`;
        selectedFilterOptionsRow.append(dynFilterButton);
      }
    });
    buttonRow.append(selectedFilterOptionsRow);
  }

  // function to generate navigation bar
  generateContentNavigation();

  // function to generate all model ui based on filter selection
  generateAllModelUi(block);
}

// function to display filter overlay popup
function enableShowMoreBtnClickEvent(showMoreBtn) {
  showMoreBtn.addEventListener('click', (e) => {
    const parentDiv = e.target.closest('.all-model-parent-div');
    const filterOverLay = parentDiv?.querySelector('.filter-overlay-wrap');
    if (filterOverLay) {
      filterOverLay.classList.toggle('active');

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

function filterPopupInputChangeEvent(event) {
  const parentBlock = event.target.closest('.all-model-parent-div');
  const checkbox = event.target;
  if (checkbox && checkbox.type === 'checkbox') {
    const isChecked = checkbox.checked;
    const filterCode = checkbox.getAttribute('id');
    if (isChecked) {
      allModelFilterJson.data.forEach((item) => {
        if (item['Filter Code'] === filterCode) {
          item.isSelected = true;
        }
      });
    } else {
      allModelFilterJson.data.forEach((item) => {
        if (item['Filter Code'] === filterCode) {
          item.isSelected = false;
        }
      });
    }
    // call function to update filter button and UI
    generateSelectedFilterOptions(parentBlock, filterCode);
  }
}

function filterBtnRowClickEvent(event) {
  const parentBlock = event.target.closest('.all-model-parent-div');
  const button = event.target.closest('.filter-btn');
  if (button) {
    const filterCode = button.getAttribute('data-filter-code');
    if (button.classList.contains('active')) {
      allModelFilterJson.data.forEach((item) => {
        if (item['Filter Code'] === filterCode) {
          item.isSelected = false;
        }
      });
    } else {
      allModelFilterJson.data.forEach((item) => {
        if (item['Filter Code'] === filterCode) {
          item.isSelected = true;
        }
      });
    }
    generateSelectedFilterOptions(parentBlock, filterCode);
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
  buttonRow.addEventListener('click', filterBtnRowClickEvent);
  allModelParentContainer.append(buttonRow);

  const showMoreButton = document.createElement('button');
  showMoreButton.classList.add('show-more-btn');
  showMoreButton.innerHTML = '<span class="show-more-icon"></span><span class="show-more-text">Show more filters</span>';
  enableShowMoreBtnClickEvent(showMoreButton);
  allModelParentContainer.append(showMoreButton);

  const overlayContainer = document.createElement('div');
  overlayContainer.classList.add('filter-overlay-wrap');
  overlayContainer.insertAdjacentHTML('beforeend', `
  <div class="filter-content">
    <h3 class="filter-heading">FILTER</h3>
    <div class="filter-body">
      <fieldset class="filter-group">
        <legend class="filter-group-heading">Body Type</legend>
        <div class="filter-group-body body-type-filter-options"></div>
      </fieldset>
      <fieldset class="filter-group">
        <legend class="filter-group-heading">Fuel Type</legend>
        <div class="filter-group-body fuel-type-filter-options"></div>
      </fieldset>
    </div>
    <div class="filter-footer">
      <button class="show-filter-btn">
        <span class="btn-text">Show results (99)</span>
      </button>
      <button class="clear-filter-btn">
        <span class="filter-trash-icon" data-icon="trash_can"></span>
        <span class="btn-text">Clear the filter</span>
      </button>
    </div>
    <button class="filter-close-button" type="button"></button>
  </div>
`);

  const filterBody = overlayContainer.querySelector('.filter-body');
  filterBody.addEventListener('change', filterPopupInputChangeEvent);

  const closeButton = overlayContainer.querySelector('.filter-close-button');
  filterCloseBtnClick(closeButton, showMoreButton);

  const clearButton = overlayContainer.querySelector('.clear-filter-btn');
  filterClearBtnClick(clearButton);

  allModelParentContainer.append(overlayContainer);

  const numberWrap = document.createElement('div');
  numberWrap.classList.add('number-wrap');
  numberWrap.innerHTML = '<span class="total-number">99</span>&nbsp;<span class="found-text">found vehicles</span>';
  allModelParentContainer.append(numberWrap);

  const navBar = document.createElement('div');
  navBar.classList.add('content-navigation');
  allModelParentContainer.append(navBar);

  const allModelsContainer = document.createElement('div');
  allModelsContainer.classList.add('all-model-container');
  allModelParentContainer.append(allModelsContainer);

  block.append(allModelParentContainer);

  generateSelectedFilterOptions(block);
}
