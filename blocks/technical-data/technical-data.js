import { getApiResponse } from '../../scripts/common/wdh-util.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

const ddlModelTitle = 'Izaberite model';
const ddlTransmissionTypeTitle = 'Izaberite menjač';
const tehcDataHeading = 'TECHNICAL DATA FOR ';
const savedListOfModels = [];
const lang = document.querySelector('meta[name="language"]').content;
const placeholders = await fetchPlaceholders(`/${lang}`);

function generateTechUi(parentBlock) {
  // const selectedModel = parentBlock.querySelector();
  // const selectedTransmissionType = parentBlock.querySelector();
  // const table = document.createElement
}

function bindClickEventForTransTypeDdlSelection(parentBlock) {
  const modelSelectionList = parentBlock.querySelectorAll('.techdata-model-ddl-model-btn.transmission-ddl');
  modelSelectionList.forEach((transmissionTypeBtn) => {
    transmissionTypeBtn.addEventListener('click', (e) => {
      const parentBlockElem = e.target.closest('.technical-data-block');
      const modelDdl = parentBlockElem.querySelector('.techdata-model-ddl-selected.transmission-ddl-selected');
      const immediateParentLi = e.target.closest('.techdata-model-ddl-model-item');
      const parentUl = e.target.closest('.techdata-model-ddl-ul');
      const listOfModelLi = parentUl.querySelectorAll('.techdata-model-ddl-model-item');
      const modelDdlContainer = e.target.closest('.techdata-model-ddl-container');
      const selectedTitle = modelDdlContainer.querySelector('.techdata-model-ddl-selected-text');
      const userClickedModelTitle = e.target.querySelector('.techdata-model-ddl-model-item-title');

      if (selectedTitle) selectedTitle.textContent = userClickedModelTitle.textContent;

      listOfModelLi.forEach((modelLi) => {
        modelLi.classList.remove('active');
      });

      if (immediateParentLi) immediateParentLi.classList.add('active');
      if (modelDdl) {
        if (modelDdl.classList.contains('clicked')) modelDdl.click();
      }

      generateTechUi(parentBlockElem);
    });    
  });
}

function generateTransTypeDdl(agCode, parentBlock) {

  const dropDownContainer = parentBlock.querySelector('.techdata-ddl-container');

  const transmissionTypeDdl = parentBlock.querySelector('.transmission-type-ddl');
  if(transmissionTypeDdl) transmissionTypeDdl.remove();
  
  const modelDdlContainer = document.createElement('div');
  modelDdlContainer.classList.add('techdata-model-ddl-container');
  modelDdlContainer.classList.add('transmission-type-ddl');

  const modelHeadingSpan = document.createElement('span');
  modelHeadingSpan.classList.add('techdata-model-ddl-title');
  modelHeadingSpan.textContent = ddlTransmissionTypeTitle;
  modelDdlContainer.append(modelHeadingSpan);

  const selectedModelBtn = document.createElement('button');
  selectedModelBtn.classList.add('techdata-model-ddl-selected');
  selectedModelBtn.classList.add('transmission-ddl-selected');
  selectedModelBtn.append(document.createRange().createContextualFragment(`
    <span class="techdata-model-ddl-selected-text"></span>            
    <i class="techdata-model-ddl-icon" data-icon="arrow_chevron_down" aria-hidden="true"></i>
    `));
  modelDdlContainer.append(selectedModelBtn);

  const cloneedselectedModelBtnMob = selectedModelBtn.cloneNode(true);
  cloneedselectedModelBtnMob.className = 'techdata-model-ddl-selected-mob';

  enableClickEventForDdl(selectedModelBtn);

  const modelDdlList = document.createElement('ul');
  modelDdlList.classList.add('techdata-model-ddl-ul');
  modelDdlList.append(cloneedselectedModelBtnMob);

  const ulContainer = document.createElement('div');
  ulContainer.classList.add('techdata-model-ddl-ul-container');
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('techdata-model-ddl-close-btn');
  enableClickEventForClose(closeBtn);

  closeBtn.append(document.createRange().createContextualFragment(`
  <i data-icon="close" aria-hidden="true"></i>
  `));
  ulContainer.append(closeBtn);
  ulContainer.append(modelDdlList);
  modelDdlContainer.append(ulContainer);

  const agCodeArrayObj = savedListOfModels.filter(vehicle => vehicle.agCode === agCode);
  const listOfTranmissions = agCodeArrayObj.map(vehicle => vehicle?.json?.responseJson?.model?.vehicles);
  const [analyticsLabel, BtnType, btnSubType] = agCodeArrayObj[0]?.analytics?.children || [];

  /* eslint-disable no-restricted-syntax */
  for (const fuel of listOfTranmissions[0]) {
    const liItem = document.createElement('li');

    const modelsUnderTheFuelList = document.createElement('ul');
    modelsUnderTheFuelList.classList.add('techdata-model-ddl-model-container');

    const modelLi = document.createRange().createContextualFragment(`
            <li class="techdata-model-ddl-model-item"><button class="techdata-model-ddl-model-btn transmission-ddl" data-transmission-code="${fuel.transmissionCode}"
            data-analytics-label='${analyticsLabel?.textContent?.trim() || ''}'
            data-analytics-link-type='${BtnType?.textContent?.trim() || ''}'
            data-analytics-link-other-type='${btnSubType?.textContent?.trim() || ''}'
            data-analytics-block-name='${parentBlock?.dataset?.blockName?.trim() || ''}'
            data-analytics-section-id='${parentBlock?.closest('.section')?.dataset?.analyticsLabel || ''}'
            data-analytics-custom-click='true'>
            <span class="techdata-model-ddl-model-item-title">${fuel.transmissionCode || ''}</span></button></li>`);
    modelsUnderTheFuelList.append(modelLi);

    
    liItem.append(modelsUnderTheFuelList);
    modelDdlList.append(liItem);
  }
  dropDownContainer.append(modelDdlContainer);

  // bind click event for transmission type ddl
  bindClickEventForTransTypeDdlSelection(parentBlock);

  // select first tranmission type if present
  const firstTranmissionType = parentBlock.querySelector('.transmission-type-ddl .techdata-model-ddl-model-btn.transmission-ddl');
  if(firstTranmissionType) firstTranmissionType.click();
}

function enableClickEventForModelDdl(ddlContainer) {
  if (ddlContainer) {
    const modelSelectionList = ddlContainer.querySelectorAll('.techdata-model-ddl-model-btn.models-ddl');
    modelSelectionList.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const agCode = e.target.getAttribute('data-agcode');
        const parentBlock = e.target.closest('.technical-data-block');
        const modelDdl = parentBlock.querySelector('.techdata-model-ddl-selected.model-ddl-selected');
        const immediateParentLi = e.target.closest('.techdata-model-ddl-model-item');
        const modelDdlContainer = e.target.closest('.techdata-model-ddl-container');
        const selectedTitle = modelDdlContainer.querySelector('.techdata-model-ddl-selected-text');
        const userClickedModelTitle = e.target.querySelector('.techdata-model-ddl-model-item-title');

        if (selectedTitle) selectedTitle.textContent = userClickedModelTitle.textContent;

        const parentUl = e.target.closest('.techdata-model-ddl-ul');
        const listOfModelLi = parentUl.querySelectorAll('.techdata-model-ddl-model-item');
        listOfModelLi.forEach((modelLi) => {
          modelLi.classList.remove('active');
        });

        if (immediateParentLi) immediateParentLi.classList.add('active');
        if (modelDdl) {
          if (modelDdl.classList.contains('clicked')) modelDdl.click();
        }
        generateTransTypeDdl(agCode, parentBlock);        
      });
    });
  }
}

function enableClickEventForDdl(ddl) {
  ddl.addEventListener('click', (e) => {
    const parentElem = e.target.closest('.techdata-model-ddl-container');
    const ddlBtn = parentElem.querySelector('.techdata-model-ddl-ul-container');
    e.target.classList.toggle('clicked');
    if (ddlBtn) ddlBtn.classList.toggle('active');
  });
}

function enableClickEventForClose(closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    const parentElem = e.target.closest('.techdata-model-ddl-ul-container');
    const ddlBtnContainer = e.target.closest('.techdata-model-ddl-container');
    const ddlBtn = ddlBtnContainer.querySelector('.techdata-model-ddl-selected');
    if (parentElem) parentElem.classList.remove('active');
    if (ddlBtn) ddlBtn.classList.remove('clicked');
  });
}

function generateModelsDdl(listOfModels, dropDownContainer, block) {
  const modelDdlContainer = document.createElement('div');
  modelDdlContainer.classList.add('techdata-model-ddl-container');

  const modelHeadingSpan = document.createElement('span');
  modelHeadingSpan.classList.add('techdata-model-ddl-title');
  modelHeadingSpan.textContent = ddlModelTitle;
  modelDdlContainer.append(modelHeadingSpan);

  const selectedModelBtn = document.createElement('button');
  selectedModelBtn.classList.add('techdata-model-ddl-selected');
  selectedModelBtn.classList.add('model-ddl-selected');
  selectedModelBtn.append(document.createRange().createContextualFragment(`
    <span class="techdata-model-ddl-selected-text"></span>            
    <i class="techdata-model-ddl-icon" data-icon="arrow_chevron_down" aria-hidden="true"></i>
    `));
  modelDdlContainer.append(selectedModelBtn);

  const cloneedselectedModelBtnMob = selectedModelBtn.cloneNode(true);
  cloneedselectedModelBtnMob.className = 'techdata-model-ddl-selected-mob';

  enableClickEventForDdl(selectedModelBtn);

  const modelDdlList = document.createElement('ul');
  modelDdlList.classList.add('techdata-model-ddl-ul');
  modelDdlList.append(cloneedselectedModelBtnMob);

  const ulContainer = document.createElement('div');
  ulContainer.classList.add('techdata-model-ddl-ul-container');
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('techdata-model-ddl-close-btn');
  enableClickEventForClose(closeBtn);

  closeBtn.append(document.createRange().createContextualFragment(`
  <i data-icon="close" aria-hidden="true"></i>
  `));
  ulContainer.append(closeBtn);
  ulContainer.append(modelDdlList);
  modelDdlContainer.append(ulContainer);

  /* eslint-disable no-restricted-syntax */
  for (const fuel in listOfModels) {
    const liItem = document.createElement('li');

    const fuelHeadingSpan = document.createElement('span');
    fuelHeadingSpan.classList.add('techdata-model-ddl-fuel-title');
    fuelHeadingSpan.textContent = fuel;
    liItem.append(fuelHeadingSpan);

    const modelsUnderTheFuelList = document.createElement('ul');
    modelsUnderTheFuelList.classList.add('techdata-model-ddl-model-container');

    listOfModels[fuel].forEach((model) => {
      const [analyticsLabel, BtnType, btnSubType] = model?.analytics?.children || [];
      const modelLi = document.createRange().createContextualFragment(`
            <li class="techdata-model-ddl-model-item"><button class="techdata-model-ddl-model-btn models-ddl" data-agcode="${model?.agCode}"
            data-analytics-label='${analyticsLabel?.textContent?.trim() || ''}'
            data-analytics-link-type='${BtnType?.textContent?.trim() || ''}'
            data-analytics-link-other-type='${btnSubType?.textContent?.trim() || ''}'
            data-analytics-block-name='${block?.dataset?.blockName?.trim() || ''}'
            data-analytics-section-id='${block?.closest('.section')?.dataset?.analyticsLabel || ''}'
            data-analytics-custom-click='true'>
            <span class="techdata-model-ddl-model-item-title">${model?.description || ''}</span>
            <i class="techdata-model-ddl-model-selected-icon" aria-hidden="true"></i>
            </button></li>`);
      modelsUnderTheFuelList.append(modelLi);
    });
    liItem.append(modelsUnderTheFuelList);
    modelDdlList.append(liItem);
  }
  dropDownContainer.append(modelDdlContainer);
}

function generateAuthoredModels(modelDetailResponse, authoredAgCode, listOfModels, analyticsProp) {
  // check if u have already saved agCode details
  const isModelExists = savedListOfModels?.some((model) => model.agCode === authoredAgCode);
  const fuelTypeVal = modelDetailResponse?.responseJson?.model?.powerTrain?.fuelType?.toLowerCase();

  const fuelType = placeholders[fuelTypeVal];
  if (!listOfModels[fuelType]) {
    listOfModels[fuelType] = [];
  }
  listOfModels[fuelType].push({
    agCode: authoredAgCode,
    analytics: analyticsProp,
    fuelType,
    description: modelDetailResponse?.responseJson?.model?.description,
  });

  // saving model details in global variable
  if (!isModelExists) {
    savedListOfModels.push({
      agCode: authoredAgCode,
      analytics: analyticsProp,
      json: modelDetailResponse,
    });
  }
}

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
export default async function decorate(block) {
  block.classList.add('technical-data-block');
  const [
    techDataProp,
    ...rows
  ] = [...block.children].map((row, index) => {
    if (index < 1) {
      return row;
    }
    return row;
  });

  const heading = document.createElement('h2');
  heading.classList.add('techdata-selected-model-title');
  heading.textContent = tehcDataHeading;

  const dropDownContainer = document.createElement('div');
  dropDownContainer.classList.add('techdata-ddl-container');

  const techDetailsTableContainer = document.createElement('div');
  techDetailsTableContainer.classList.add('techdata-tables-container');

  const enableAutoData = techDataProp?.querySelector('h2');
  const enableAccordion = techDataProp?.querySelector('h3');
  if (enableAccordion?.textContent === 'true') block.classList.add('techdata-enable-accordion');

  const spreadSheetLink = techDataProp?.querySelector('a');

  const listOfModels = [];

  /* eslint-disable no-await-in-loop */
  for (const modelData of rows) {
    const [modelProp, analyticsProp] = modelData?.children || [];

    modelProp.classList.add('techdata-model-ddl');

    const [modelPropData] = modelProp?.children || [];
    const splittedModelData = modelPropData?.textContent?.split(',');

    if (splittedModelData && splittedModelData?.length >= 3) {
      const authoredAgCode = splittedModelData[2]?.trim() || '';
      try {
        // wdh call or else spreadsheet call
        if (enableAutoData) {
          const modelDetailResponse = await getApiResponse(authoredAgCode);
          generateAuthoredModels(modelDetailResponse, authoredAgCode, listOfModels, analyticsProp);
        }
      } catch (error) {
        console.error('fetch model detail failed');
      }
    }
  }

  if (rows.length > 1) {
    generateModelsDdl(listOfModels, dropDownContainer, block);
    enableClickEventForModelDdl(dropDownContainer);    
  } else {
    generateTechDataUI(listOfModels[0].agCode);
  }
  block.textContent = '';
  block.append(heading);
  block.append(dropDownContainer);
  block.append(techDetailsTableContainer);

  // click first model to select it
  const firstModelDdlItem = block.querySelector('.techdata-model-ddl-model-btn.models-ddl');
  if (firstModelDdlItem) firstModelDdlItem.click();
}
