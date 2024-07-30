import {
  getResolutionKey,
  getCosyImageUrl,
  getCosyImage,
  getTechnicalSpreadsheetData,
} from '../../scripts/common/wdh-util.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
const viewPortWidth = window.innerWidth;
// delete - dummy json's - start
const filterJsonApiResponse = {
  total: 7,
  offset: 0,
  limit: 7,
  data: [
    {
      'Filter Type': 'Body Type',
      'Filter Type Serbian': 'Tip karoserije',
      'Filter Name English': 'Sedan',
      'Filter Name Serbian': 'Sedan',
      'Filter Code': 'c',
      'Show As Default': 'false',
    },
    {
      'Filter Type': 'Body Type',
      'Filter Type Serbian': 'Tip karoserije',
      'Filter Name English': 'SUV',
      'Filter Name Serbian': 'SUV',
      'Filter Code': 'b',
      'Show As Default': 'true',
    },
    {
      'Filter Type': 'Body Type',
      'Filter Type Serbian': 'Tip karoserije',
      'Filter Name English': 'Hatchback',
      'Filter Name Serbian': 'Hatchback',
      'Filter Code': 'a',
      'Show As Default': 'true',
    },
    {
      'Filter Type': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Gasoline',
      'Filter Name Serbian': 'Benzene',
      'Filter Code': 'O',
      'Show As Default': 'false',
    },
    {
      'Filter Type': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Diesel',
      'Filter Name Serbian': 'Dizel',
      'Filter Code': 'D',
      'Show As Default': 'false',
    },
    {
      'Filter Type': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Plugin Hybrid',
      'Filter Name Serbian': 'Plugin Hi-Brid',
      'Filter Code': 'X',
      'Show As Default': 'true',
    },
    {
      'Filter Type': 'Fuel Type',
      'Filter Type Serbian': 'Fuel Type',
      'Filter Name English': 'Electric',
      'Filter Name Serbian': 'Električni',
      'Filter Code': 'E',
      'Show As Default': 'true',
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
      'Analytics': '',
      'Model Code': '7K11',
      'Price': '9812734',
      'Sub brand Icon': 'i',
      'New Label': 'true',
      'Fuel Type': 'O,E',
      'Body Type': 'Sedan',
      'Show More Button': 'true',
      'Show More Button Link': 'https://www.bmw.rs/sr/all-models/bmw-i/i5/bmw-i5-pregled.html',
      'Configurator Button': 'true',
      'Stock Locator Button': 'true',
    },
    {
      'Model Name': 'BMW i5',
      'Category/Group': 'i',
      'Analytics': '',
      'Model Code': '7K11',
      'Price': '9812734',
      'Sub brand Icon': 'i',
      'New Label': 'true',
      'Fuel Type': 'O,E',
      'Body Type': 'Sedan',
      'Show More Button': 'true',
      'Show More Button Link': 'https://www.bmw.rs/sr/all-models/bmw-i/i5/bmw-i5-pregled.html',
      'Configurator Button': 'true',
      'Stock Locator Button': 'true',
    },
    {
      'Model Name': 'BMW 5 Series 5 Sedan',
      'Category/Group': '5',
      'Analytics': '',
      'Model Code': '7K12',
      'Price': '1234',
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
      'Analytics': '',
      'Model Code': '7K31',
      'Price': '1234',
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
      'Analytics': '',
      'Model Code': '10FK',
      'Price': '2346233',
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
  allModelCategory5: '5',
  allModelCategory4: '4',
  allModelCategory3: '3',
  allModelCategory2: '2',
  allModelCategory1: '1',
  allModelCategoryZ4: 'Z4',
  allModelFromText: 'From',
  allModelNewLabel: 'New',
};

placeholders = { ...placeholders, ...placeholders2 };

// Fetch the cozy image URL based on model code
async function fetchCozyImageUrl(modelCode, isFirstChild) {
  const pictureTag = document.createElement('picture');
  pictureTag.classList.add('all-model-picture-tag');
  try {
    const response = await getCosyImage(modelCode);

    const screenWidth = window.innerWidth;
    const resolutionKey = getResolutionKey(screenWidth);

    const createPictureTag = (quality) => {      
      const resolutions = [1025, 768];
      resolutions.forEach((resolution) => {
        const sourceTag = document.createElement('source');        
        sourceTag.srcset = getCosyImageUrl(
          response,
          getResolutionKey(resolution),
          40,
        );
        sourceTag.media = `(min-width: ${resolution}px)`;
        pictureTag.appendChild(sourceTag);
      });

      // Fallback img tag
      const imgTag = document.createElement('img');
      imgTag.src = getCosyImageUrl(response, resolutionKey, isFirstChild === true ? 40 : 20);
      imgTag.alt = modelCode;
      imgTag.classList.add('all-model-image');
      pictureTag.appendChild(imgTag);
    };

    createPictureTag(20);
  } catch (error) {
    console.error('Error fetching image:', error);
  }
  return pictureTag;
}

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

let scrollAmount = 0;
function scrollToRight() {
  const leftButton = document.querySelector('.nav-arrow-left');
  const rightButton = document.querySelector('.nav-arrow-right');
  const list = document.querySelector('.nav-list');
  const parentDiv = document.querySelector('.content-navigation');
  
  rightButton.addEventListener('click', (e) => {
    scrollAmount = list.scrollWidth - parentDiv.clientWidth;
    if (e.target.parentElement.classList.contains('arrow-right-active')) {
    list.style.transition = 'margin-left .25s ease-in';
    list.style.marginLeft = `-${scrollAmount + 10}px`;
    updateButtons(leftButton, rightButton, parentDiv, list);
    }
  });
}
function scrollToLeft() {
  const leftButton = document.querySelector('.nav-arrow-left');
  const rightButton = document.querySelector('.nav-arrow-right');
  const list = document.querySelector('.nav-list');
  const parentDiv = document.querySelector('.content-navigation');
  
  leftButton.addEventListener('click', (e) => {
    scrollAmount = -10;
    if (e.target.parentElement.classList.contains('arrow-left-active')) {
    list.style.transition = 'margin-left .25s ease-in';
    list.style.marginLeft = '0px';
    updateButtons(leftButton, rightButton, parentDiv, list);
    }
  });
}
function updateButtons(leftBtn, rightBtn, parentDiv, list) {
  if (scrollAmount > 0) {
    leftBtn.style.visibility = 'visible';
    parentDiv.classList.add('arrow-left-active');
  } else {
    leftBtn.style.visibility = 'hidden';
    parentDiv.classList.remove('arrow-left-active');
  }

  if (-scrollAmount < list.scrollWidth - list.clientWidth) {
    rightBtn.style.visibility = 'hidden';
    parentDiv.classList.remove('arrow-right-active');
  } else {
    rightBtn.style.visibility = 'visible';
    parentDiv.classList.add('arrow-right-active');
  }
}

function handleContenNavMobile() {
  const buttonSelector = document.getElementById('navMenuBtn');
  const navList = document.querySelector('.nav-list');
  const items = document.querySelectorAll('.nav-list-item');
  buttonSelector.addEventListener('click', (e) => {
    if (!e.target.parentElement.classList.contains('content-navigation-active')) {
      e.target.parentElement.classList.add('content-navigation-active');
      navList.classList.add('mobile-only');
      navList.children[0].children[0].classList.add('nav-list-button-active');
      items.forEach((item) => {
        if(buttonSelector.innerText === item.innerText) {
          item.children[0].classList.add('nav-list-button-active');
        } else {
          item.children[0].classList.remove('nav-list-button-active');
        }
      })
    } else {
      e.target.parentElement.classList.remove('content-navigation-active');
    }
  });
}

// ------------------------- bharath Code Start -------------------------------

function lazyLoadCozyImages(block) {
  const imageContainer = block.querySelectorAll('.all-model-card-img-container');

  const lazyLoad = async (imageContainer) => {
    const modelCode = imageContainer.getAttribute('data-model-code');
    const isFirstChild = imageContainer.classList.contains('first-model-child');
    const pictureTag = await fetchCozyImageUrl(modelCode, isFirstChild);
    imageContainer.append(pictureTag);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const imageContainer = entry.target;
        lazyLoad(imageContainer).then(() => observer.unobserve(imageContainer));
      }
    });
  });

  imageContainer.forEach((container) => {
    observer.observe(container);
  });
}

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

    filterArrayBasedOnCategory.forEach((model, index) => {
      let fuelTypeMarkUp = '';
      let electricOrHybridClass = '';
      let isFirstChild = index === 0 ? 'first-model-child' : '';
      let newLabel =  model['New Label'] === 'true' ? placeholders['allModelNewLabel'] : '';
      const fuelDetails = model['Fuel Type'].split(',');

      let subBrandIcon = '';
      if (model['Sub brand Icon'] === 'i') {
        subBrandIcon = `<img src="../../icons/BMW_subrand_i.png" alt="${model['Model Name']}" title="${model['Model Name']}" class="all-model-card____subbrand-img">`;
      } else if(model['Sub brand Icon'] === 'M') {
        subBrandIcon = `<img src="../../icons/BMW_subrand_m.png" alt="${model['Model Name']}" title="${model['Model Name']}" class="all-model-card____subbrand-img">`;
      }


      fuelDetails.forEach((fuelType, index) => {
        if (index > 0) {
          fuelTypeMarkUp += '<span class=\'all-model-fuel-type\'> • </span>';
        }
        fuelTypeMarkUp += `<span class='all-model-fuel-type'>${placeholders[fuelType?.toLowerCase()?.trim()]}</span>`;

        if (fuelType.trim().toLowerCase() === 'e') {
          electricOrHybridClass = 'electric-icon';
        } else if (fuelType.trim().toLowerCase() === 'x') {
          electricOrHybridClass = 'hybrid-icon';
        }
      });

      listOfModelsContainer.insertAdjacentHTML('beforeend', `
    <div class='all-model-card-container'>
      <div class='all-model-card-img-container ${isFirstChild}' data-model-code='${model['Model Code']}'>
      <div class="all-model-card__subbrands"><div class="all-model-card__subbrands-wrap">${subBrandIcon}</div></div>
      <span class="all-model-card__new-model-label" aria-label="${newLabel}">${newLabel}</span>
      <div class="all-model-card__fuel-type-icon"><span class="${electricOrHybridClass}"></span></div>
      </div>
      <button class='all-model-card-btn'></button>
      <div class='all-model-detail-container ${isFirstChild}'>
        <div class='all-model-detail-label ${isFirstChild}'>
          <div class="all-model-card__subbrands"><div class="all-model-card__subbrands-wrap">${subBrandIcon}</div></div>
          <span class="all-model-card__new-model-label" aria-label="${newLabel}">${newLabel}</span>
        </div>
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
  if (bmwiGroupMarkUp.children.length > 0) allModelContainer.append(bmwiGroupMarkUp);

  const xGroupMarkUp = generateGroupMarkUp('X', allModelfilteredArray);
  if (xGroupMarkUp.children.length > 0) allModelContainer.append(xGroupMarkUp);

  const mGroupMarkUp = generateGroupMarkUp('M', allModelfilteredArray);
  if (mGroupMarkUp.children.length > 0) allModelContainer.append(mGroupMarkUp);

  const eightGroupMarkUp = generateGroupMarkUp('8', allModelfilteredArray);
  if (eightGroupMarkUp.children.length > 0) allModelContainer.append(eightGroupMarkUp);

  const sevenGroupMarkUp = generateGroupMarkUp('7', allModelfilteredArray);
  if (sevenGroupMarkUp.children.length > 0) allModelContainer.append(sevenGroupMarkUp);

  const sixGroupMarkUp = generateGroupMarkUp('6', allModelfilteredArray);
  if (sixGroupMarkUp.children.length > 0) allModelContainer.append(sixGroupMarkUp);

  const fiveGroupMarkUp = generateGroupMarkUp('5', allModelfilteredArray);
  if (fiveGroupMarkUp.children.length > 0) allModelContainer.append(fiveGroupMarkUp);

  const fourGroupMarkUp = generateGroupMarkUp('4', allModelfilteredArray);
  if (fourGroupMarkUp.children.length > 0) allModelContainer.append(fourGroupMarkUp);

  const threeGroupMarkUp = generateGroupMarkUp('3', allModelfilteredArray);
  if (threeGroupMarkUp.children.length > 0) allModelContainer.append(threeGroupMarkUp);

  const twoGroupMarkUp = generateGroupMarkUp('2', allModelfilteredArray);
  if (twoGroupMarkUp.children.length > 0) allModelContainer.append(twoGroupMarkUp);

  const oneGroupMarkUp = generateGroupMarkUp('1', allModelfilteredArray);
  if (oneGroupMarkUp.children.length > 0) allModelContainer.append(oneGroupMarkUp);

  const z4GroupMarkUp = generateGroupMarkUp('Z4', allModelfilteredArray);
  if (z4GroupMarkUp.children.length > 0) allModelContainer.append(z4GroupMarkUp);

  // update number of results
  const totalNumberText = block.querySelector('.total-number');
  totalNumberText.textContent = block?.querySelectorAll('.all-model-card-container')?.length || 0;

  // lazy load cozy images
  lazyLoadCozyImages(block);
}

function generateAllModelUi(block) {
  // loop through filter json to find which are options whch are selected
  const selectedFilterArray = allModelFilterJson.data.filter((item) => item.isSelected === true);

  let allModelfilteredArray = [];

  if (selectedFilterArray.length > 0) {
    allModelOverviewJson.data.forEach((item) => {
      selectedFilterArray.forEach((selectedItem) => {
        let convertedFuelTypes = '';
        const fuelTypes = item['Fuel Type'].toLowerCase().split(',');
        fuelTypes.forEach((fuelType, index) => {
          if (index > 0) {
            convertedFuelTypes += ',';
          }
          convertedFuelTypes += placeholders[fuelType.trim()]
        });

        if ((selectedItem['Filter Type'] === 'Fuel Type' && item['Fuel Type']?.toLowerCase().includes(selectedItem['Filter Code'].toLowerCase()))
          || (selectedItem['Filter Type'] === 'Body Type' && item['Body Type'].includes(selectedItem['Filter Name English']))) {
          allModelfilteredArray.push(item);
        }
      });
    });
  } else {
    allModelfilteredArray = allModelOverviewJson.data;
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

    if (options['Filter Type'] === 'Body Type') {
      bodyTypeFiltersOptions.append(optionDiv);
    } else if (options['Filter Type'] === 'Fuel Type') {
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
      if (options['Show As Default'] === 'true') {
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
          dynFilterButton.setAttribute('data-filter-option', options['Filter Type']);
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
      if (options['Show As Default'] === 'true') {
        const filterButton = document.createElement('button');
        filterButton.classList.add('filter-btn');
        filterButton.classList.add('default-filter-button');
        filterButton.setAttribute('data-filter-type', options['Filter Name English']);
        filterButton.setAttribute('data-filter-option', options['Filter Type']);
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
        dynFilterButton.setAttribute('data-filter-option', options['Filter Type']);
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
    //     allModelFilterJson.data = spreadSheetResponse?.responseJson?.data || [];
    //   } else {
    //     allModelOverviewJson.data = spreadSheetResponse?.responseJson?.data || [];
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

function applyStickyNav() {
  const nav = document.querySelector('.content-navigation');
  const sticky = nav.offsetTop;
  if (window.pageYOffset < sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

function handleTabletView() {
  const isTabletView = viewPortWidth >= 768 && viewPortWidth <= 1024;
  const rightArrow = document.querySelector('.nav-arrow-right');
  const contentNav = document.querySelector('.content-navigation');
  if (isTabletView) {
    rightArrow.style.visibility = 'visible';
    contentNav.classList.add('arrow-right-active');
  }
}

function dropDownContentClick() {
  const links = document.querySelectorAll('.nav-list-button');
  const contentNav = document.querySelector('.content-navigation');
  const menuBtn = document.querySelector('.content-nav-selected-value');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const model = e.target;
      if(model.textContent === link.textContent){
        model.classList.add('nav-list-button-active');
        links[0].classList.remove('nav-list-button-active');
        menuBtn.textContent = model.textContent;
      }
      contentNav.classList.remove('content-navigation-active');
    });
  });
}

function enableModelCardClickEvent(block) {
  const allModelContainer = block.querySelector('.all-model-container');
  
  // Event delegation: handle clicks on buttons inside the test div
  allModelContainer.addEventListener('click', (event) => {
    // Check if the clicked element is a button
    if (event.target?.classList.contains('all-model-card-btn')) {
        alert('Button clicked: ' + event.target.textContent);
    }
});
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

  const allModelsContainer = document.createElement('div');
  allModelsContainer.classList.add('all-model-container');
  allModelParentContainer.append(allModelsContainer);

  block.append(allModelParentContainer);

  generateSelectedFilterOptions(block);
  enableModelCardClickEvent(block);

  handleContenNavMobile();
  
  handleTabletView();
  scrollToRight();
  scrollToLeft();
}
