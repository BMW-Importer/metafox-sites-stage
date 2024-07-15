import { getApiResponse } from '../../scripts/common/wdh-util.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import { techDataMarkUp } from '../../scripts/common/technical-data-structure.js';

const ddlModelTitle = 'Izaberite model';
const ddlTransmissionTypeTitle = 'Izaberite menjač';
const tehcDataHeading = 'TECHNICAL DATA FOR ';
const savedListOfModels = [];
const lang = document.querySelector('meta[name="language"]').content;
let placeholders = await fetchPlaceholders(`/${lang}`);
const arrowIconMarkUp = document.createRange().
  createContextualFragment(`<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>`);

const placeholders2 = {
  techDataTotalPower: "Total Power",
  techDataEngineType: "Engine type",
  techDataPowerInKw: "Power in kW (hp)",
  techDataTorqueInNm: "Torque in Nm",
  techDataTransmission: "Transmission",
  techDataGearBox: "Gearbox",
  techDataDrive: "Drive",
  techDataTwinPower:"TwinPower Turbo internal combustion engine",
  techDataCylinders:"Cylinders",
  techDataVolumneInCm:"Volume in cm",
  techDataNominalPowerInKw:"Nominal power in kW (HP)/1/min",
  techDataNominalSpeedInNm:"Nominal speed in Nm/1/min",
  techDataElectricMotor:"Electric motor",
  techDataNominalPowerElectricMotorKw: "Nominal power of the electric motor in kW (HP)",
  techDataNominalTorqueInNm: "(Nominal) torque in Nm",
  techDataPerformance: "Performance",
  techDataAccelerationZeroToHundread:"Acceleration 0-100 km/h for s",
  techDataMaximumSpeedInKm:"Maximum speed in km/h",
  techDataMaximumSpeedInKmElectricMotor:"Maximum speed in km/h (electric motor)",
  techDataConsumptionEmission: "Consumption/Emissions",
  techDataFuelConsumptionCombinedWltpUl: "Fuel consumption, combined WLTP ul/100 km",
  techDataC02EmissionsCombinedWltpUgkm: "C02 emissions, combined WLTP ug/km",
  techDataEnergyConsumptionCombinedWltpInKwh: "Energy consumption, combined WLTP in kWh/100 km",
  techDataElectricRangeWltpInKm: "Electric range, WLTP in km",
  techDataHighVoltageBatteryCharging: "High voltage battery/48V, charging",
  techDataBatteryCapacityInKwh: "Battery capacity in kWh",
  techDataAdditionalRangeAfterMinOfCharge: "Additional range after 10 minutes of charging at a high-power station in km",
  techDataMaximumChargingPowerAcDcInKw: "Maximum charging power AC/DC in kW",
  techDataChargingTimeAcHr: "Charging time AC 0–100% hr",
  techDataChargingTimeDcInMin: "Charging time DC 10–80% in min",
};

placeholders = Object.assign({}, placeholders, placeholders2);

function replacePlaceholders(template, data) {
  return template.replace(/{(\w+(\.\w+)*?)}/g, (match, path) => {
      const keys = path.split('.');
      let value = data;
      for (const key of keys) {
          if (value && value[key] !== undefined) {
              value = value[key];
          } else {
              return match;
          }
      }
      return value;
  });
}

function generateTechUi(parentBlock) {
  const technicalDataTableContainer = parentBlock.querySelector('.techdata-tables-container');
  const selectedModel = parentBlock.querySelector('.models-type-ddl .techdata-model-ddl-model-item.active');
  const selectedTransmissionType = parentBlock.querySelector('.transmission-type-ddl .techdata-model-ddl-model-item.active');
  const agCode = selectedModel?.querySelector('.techdata-model-ddl-model-btn')?.getAttribute('data-agcode') || '';
  const transmissionType = selectedTransmissionType?.querySelector('.techdata-model-ddl-model-btn')?.getAttribute('data-transmission-code') || '';
  const agCodeArrayObj = agCode ? savedListOfModels.filter(vehicle => vehicle.agCode === agCode) : savedListOfModels;
  let technicalData;
  if (transmissionType) {
    const transCodeArray = agCodeArrayObj[0]?.json?.responseJson?.model?.vehicles?.filter(transType => transType?.transmissionCode === transmissionType);
    technicalData = transCodeArray[0].technicalData;
  } else {
    technicalData = agCodeArrayObj[0]?.json?.responseJson?.model?.vehicle[0]?.technicalData;
  }

  if (technicalData) {
    technicalDataTableContainer.textContent = '';

    const data = {placeholders, technicalData};
    const replacedHtml = replacePlaceholders(techDataMarkUp, data);
    technicalDataTableContainer.innerHTML = replacedHtml;
  }
}

function bindClickEventForTransTypeDdlSelection(parentBlock) {
  const modelSelectionList = parentBlock.querySelectorAll('.techdata-model-ddl-model-btn.transmission-ddl');
  modelSelectionList.forEach((transmissionTypeBtn) => {
    transmissionTypeBtn.addEventListener('click', (e) => {
      const immediateParentUl = e.target.closest('.techdata-model-ddl-ul');
      const listOfModelBtns = immediateParentUl.querySelectorAll('.techdata-model-ddl-model-item');
      const currentSelectedLi = e.target.closest('.techdata-model-ddl-model-item');
      const parentBlockElem = e.target.closest('.technical-data-block');

      // loop through this list and remove active class
      listOfModelBtns.forEach((liElem) => {
        liElem.classList.remove('active');
      });

      // set current clicked item as active
      currentSelectedLi.classList.add('active');

      // function to update techData and generate
      updateUiAfterDdlSelection('transmission-selection', parentBlockElem);
    });
  });
}

function generateTransTypeDdl(agCode, parentBlock) {

  const dropDownContainer = parentBlock.querySelector('.techdata-ddl-container');

  const transmissionTypeDdl = parentBlock.querySelector('.transmission-type-ddl');
  if (transmissionTypeDdl) transmissionTypeDdl.remove();

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
            <span class="techdata-model-ddl-model-item-title">${fuel.transmissionCode || ''}</span>
            <i class="techdata-model-ddl-model-selected-icon" aria-hidden="true">
            </button></li>`);
    modelsUnderTheFuelList.append(modelLi);


    liItem.append(modelsUnderTheFuelList);
    modelDdlList.append(liItem);
  }
  dropDownContainer.append(modelDdlContainer);

  // bind click event for transmission type ddl
  bindClickEventForTransTypeDdlSelection(parentBlock);

  // select first tranmission type if present
  const firstTranmissionType = parentBlock.querySelector('.techdata-model-ddl-model-btn.transmission-ddl');
  if (firstTranmissionType) firstTranmissionType.click();
}

function updateUiAfterDdlSelection(selectionType, block) {
  // hidding drop down which are active i.e opened or visible
  const activeDdl = block.querySelectorAll('.techdata-model-ddl-ul-container.active');
  activeDdl.forEach((ddl) => {
    const parentContainer = ddl.closest('.techdata-model-ddl-container');
    const ddlTriggerBtn = parentContainer.querySelector('.techdata-model-ddl-selected');
    if (ddlTriggerBtn) ddlTriggerBtn.click();
  });

  if (selectionType === 'model-selection') {
    const parentModelDdlContainer = block.querySelector('.models-type-ddl');
    const activeModelLi = parentModelDdlContainer.querySelector('.techdata-model-ddl-model-item.active');
    const activeModelLiBtn = activeModelLi.querySelector('.techdata-model-ddl-model-btn');
    const activeModelLiBtnText = activeModelLiBtn.querySelector('.techdata-model-ddl-model-item-title');
    const listOfSelectedText = parentModelDdlContainer.querySelectorAll('.techdata-model-ddl-selected-text');

    // updating selected model value
    listOfSelectedText.forEach((spanElem) => {
      spanElem.textContent = activeModelLiBtnText?.textContent;
    });

    // calling function to generate transmission type dropdown
    const agCode = activeModelLiBtn.getAttribute('data-agcode')
    generateTransTypeDdl(agCode, block);
  } else {
    const parentModelDdlContainer = block.querySelector('.transmission-type-ddl');
    const activeModelLi = parentModelDdlContainer.querySelector('.techdata-model-ddl-model-item.active');
    const activeModelLiBtn = activeModelLi.querySelector('.techdata-model-ddl-model-btn');
    const activeModelLiBtnText = activeModelLiBtn.querySelector('.techdata-model-ddl-model-item-title');
    const listOfSelectedText = parentModelDdlContainer.querySelectorAll('.techdata-model-ddl-selected-text');

    // updating selected model value
    listOfSelectedText.forEach((spanElem) => {
      spanElem.textContent = activeModelLiBtnText?.textContent;
    });

    // generate UI
    generateTechUi(block);
  }
}

function enableClickEventForModelDdl(ddlContainer) {
  if (ddlContainer) {
    const modelSelectionList = ddlContainer.querySelectorAll('.techdata-model-ddl-model-btn.models-ddl');
    modelSelectionList.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const immediateParentUl = e.target.closest('.techdata-model-ddl-ul');
        const listOfModelBtns = immediateParentUl.querySelectorAll('.techdata-model-ddl-model-item');
        const currentSelectedLi = e.target.closest('.techdata-model-ddl-model-item');
        const parentBlockElem = e.target.closest('.technical-data-block');

        // loop through this list and remove active class
        listOfModelBtns.forEach((liElem) => {
          liElem.classList.remove('active');
        });

        // set current clicked item as active
        currentSelectedLi.classList.add('active');

        // function to update techData and generate
        updateUiAfterDdlSelection('model-selection', parentBlockElem);
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
  modelDdlContainer.classList.add('models-type-ddl');

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
