import { getApiResponse } from '../../scripts/common/wdh-util.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

const ddlModelTitle = 'Izaberite model';
const ddlTransmissionTypeTitle = 'Izaberite menjač';
const tehcDataHeading = 'TECHNICAL DATA FOR ';
const savedListOfModels = [];
const lang = document.querySelector('meta[name="language"]').content;
const placeholders = await fetchPlaceholders(`/${lang}`);

function generateModelsDdl(listOfModels, dropDownContainer, block) {
  const modelDdlContainer = document.createElement('div');
  modelDdlContainer.classList.add('techdata-model-ddl-container');

  const modelHeadingSpan = document.createElement('span');
  modelHeadingSpan.classList.add('techdata-model-ddl-title');
  modelHeadingSpan.textContent = ddlModelTitle;
  modelDdlContainer.append(modelHeadingSpan);

  const selectedModelBtn = document.createElement('button');
  selectedModelBtn.classList.add('techdata-model-ddl-selected');
  selectedModelBtn.append(document.createRange().createContextualFragment(`
    <span class="techdata-model-ddl-selected-text">test</span>            
    <i class="techdata-model-ddl-icon" data-icon="arrow_chevron_down" aria-hidden="true"></i>
    `));
  modelDdlContainer.append(selectedModelBtn);

  const cloneedselectedModelBtnMob = selectedModelBtn.cloneNode(true);
  cloneedselectedModelBtnMob.className = 'techdata-model-ddl-selected-mob';

  const modelDdlList = document.createElement('ul');
  modelDdlList.classList.add('techdata-model-ddl-ul');
  modelDdlList.append(cloneedselectedModelBtnMob);

  const ulContainer = document.createElement('div');
  ulContainer.classList.add('techdata-model-ddl-ul-container');
  ulContainer.append(modelDdlList);
  modelDdlContainer.append(ulContainer);

  /* eslint-disable no-restricted-syntax */
  for (const fuel of listOfModels) {
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
            <li class="techdata-model-ddl-model-item"><button class="techdata-model-ddl-model-btn" data-agcode="${model?.agCode}"
            data-analytics-label='${analyticsLabel?.textContent?.trim() || ''}'
            data-analytics-link-type='${BtnType?.textContent?.trim() || ''}'
            data-analytics-link-other-type='${btnSubType?.textContent?.trim() || ''}'
            data-analytics-block-name='${block?.dataset?.blockName?.trim() || ''}'
            data-analytics-section-id='${block?.closest('.section')?.dataset?.analyticsLabel || ''}'
            data-analytics-custom-click='true'>
            <span class="techdata-model-ddl-model-item-title">${model?.description || ''}</span></button></li>`);
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
  } else {
    generateTechDataUI(listOfModels[0]);
  }
  block.textContent = '';
  block.append(heading);
  block.append(dropDownContainer);
}
