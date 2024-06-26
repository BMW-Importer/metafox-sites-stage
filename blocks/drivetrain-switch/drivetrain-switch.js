// import {
//   DEV, STAGE,
//   PROD, disclaimerGQlEndpoint,
// } from '../../scripts/common/constants.js';

// const env = document.querySelector('meta[name="env"]').content;
// const hostName = window?.location?.hostname;
// const regExp = /^(.*\.hlx\.(page|live)|localhost)$/;
// let galOrigin = '';
// let publishDomain = '';

// if (env === 'dev') {
//   publishDomain = DEV.hostName;
// } else if (env === 'stage') {
//   publishDomain = STAGE.hostName;
// } else {
//   publishDomain = PROD.hostName;
// }

// async function getContentFragmentData(disclaimerCFPath, gqlOrigin) {
//   const endpointUrl = gqlOrigin + disclaimerGQlEndpoint + disclaimerCFPath.innerText;
//   const response = await fetch(endpointUrl);
//   return response.json();
// }

// export default async function decorate(block) {
//   block.classList.add('drivetrain-switch-block');

//   const leftPanel = document.createElement('div');
//   leftPanel.classList.add('dts-left-panel');
//   const rightPanel = document.createElement('div');
//   rightPanel.classList.add('dts-right-panel');

//   const selectedModelDdlMob = document.createElement('button');
//   selectedModelDdlMob.classList.add('dts-selected-model-mob');

//   const leftPanelModelGrouping = document.createElement('ul');
//   leftPanelModelGrouping.classList.add('dts-model-grouping');

//   const rightPanelTitleAndImg = document.createElement('div');
//   rightPanelTitleAndImg.classList.add('dts-right-model-title');

//   const rightPanelTechDetail = document.createElement('div');
//   rightPanelTechDetail.classList.add('dts-right-tech-detail');

//   const techTable = document.createElement('table');
//   techTable.setAttribute('role', 'table');
//   rightPanelTechDetail.append(techTable);

//   const techTableData = document.createElement('tbody');
//   techTableData.setAttribute('role', 'rowgroup');
//   techTable.append(techTableData);

//   const [
//     fuelType,
//     detailCell,
//     disclaimerFragment,
//     technicalDetail1Cell,
//     technicalDetail2Cell,
//     ...rows
//   ] = [...block.children].map((row, index) => {
//     if (index < 5) {
//       return row;
//     }
//     return [...row.children];
//   });
//   // extracting detail cell
//   const labelSource = fuelType?.querySelector('h2');
//   block.removeChild(fuelType);

//   const activeModelTitle = detailCell?.querySelector('h3');
//   rightPanelTitleAndImg.append(activeModelTitle);
//   rightPanel.append(rightPanelTitleAndImg);

//   const modelDescp = detailCell?.querySelector('h4');
//   rightPanel.append(modelDescp);

//   // appending table below the description
//   rightPanel.append(rightPanelTechDetail);

//   const technicalLink = detailCell?.querySelector('a');
//   rightPanelTechDetail.append(technicalLink);

//   const popover = detailCell?.querySelector('h6');
//   // removing detailcell so that it wont appear in content tree
//   block.removeChild(detailCell);

//   // disclaimer fragment
//   const [disclaimerCF] = disclaimerFragment?.children || '';

//   if (hostName) {
//     const match = regExp.exec(hostName);
//     if (match) {
//       galOrigin = publishDomain;
//     }
//   }
//   await getContentFragmentData(disclaimerCF, galOrigin).then((response) => {
//     const cfData = response?.data;
//     if (cfData) {
//       const disclaimerHtml = cfData?.disclaimercfmodelByPath?.item?.disclaimer?.html;
//       const disclaimerContent = document.createElement('div');
//       disclaimerContent.className = 'disclaimer-content';
//       disclaimerContent.innerHTML = disclaimerHtml;
//       rightPanelTechDetail.append(disclaimerContent);
//       block.removeChild(disclaimerFragment);
//     }
//   });

//   // extracting technical data
//   const tableRow1 = document.createElement('tr');

//   const dataFactLabel1 = technicalDetail1Cell?.querySelector('h2');
//   if (dataFactLabel1.textContent) {
//     tableRow1.append(document.createRange().createContextualFragment(`
//     <td class="" role="rowheader"><div>${dataFactLabel1}</div></td>
//     `));
//   }
//   const dataFactVal1 = technicalDetail1Cell?.querySelector('h3');
//   if (dataFactVal1.textContent) {
//     tableRow1.append(document.createRange().createContextualFragment(`
//     <td class="" role="cell"><div>${dataFactVal1}</div></td>
//     `));
//   }
//   if (tableRow1.textContent) techTableData.append(tableRow1);

//   const tableRow2 = document.createElement('tr');

//   const dataFactLabel2 = technicalDetail1Cell?.querySelector('h4');
//   if (dataFactLabel2.textContent) {
//     tableRow2.append(document.createRange().createContextualFragment(`
//     <td class="" role="rowheader"><div>${dataFactLabel2}</div></td>
//     `));
//   }
//   const dataFactVal2 = technicalDetail1Cell?.querySelector('h5');
//   if (dataFactVal2.textContent) {
//     tableRow2.append(document.createRange().createContextualFragment(`
//     <td class="" role="cell"><div>${dataFactVal2}</div></td>
//     `));
//   }
//   if (tableRow2.textContent) techTableData.append(tableRow2);

//   // removing techdetail1 so that it wont appear in content tree
//   block.removeChild(technicalDetail1Cell);

//   const tableRow3 = document.createElement('tr');

//   const dataFactLabel3 = technicalDetail2Cell?.querySelector('h2');
//   if (dataFactLabel3.textContent) {
//     tableRow3.append(document.createRange().createContextualFragment(`
//     <td class="" role="rowheader"><div>${dataFactLabel3}</div></td>
//     `));
//   }
//   const dataFactVal3 = technicalDetail2Cell?.querySelector('h3');
//   if (dataFactVal3.textContent) {
//     tableRow3.append(document.createRange().createContextualFragment(`
//     <td class="" role="cell"><div>${dataFactVal3}</div></td>
//     `));
//   }
//   if (tableRow3.textContent) techTableData.append(tableRow3);

//   const tableRow4 = document.createElement('tr');

//   const dataFactLabel4 = technicalDetail2Cell?.querySelector('h4');
//   if (dataFactLabel4.textContent) {
//     tableRow4.append(document.createRange().createContextualFragment(`
//     <td class="" role="rowheader"><div>${dataFactLabel4}</div></td>
//     `));
//   }
//   const dataFactVal4 = technicalDetail2Cell?.querySelector('h5');
//   if (dataFactVal4.textContent) {
//     tableRow4.append(document.createRange().createContextualFragment(`
//     <td class="" role="cell"><div>${dataFactVal4}</div></td>
//     `));
//   }
//   if (tableRow4.textContent) techTableData.append(tableRow4);

//   // removing techdetail1 so that it wont appear in content tree
//   block.removeChild(technicalDetail2Cell);

//   // looping through children model card blocks
//   rows.forEach((element) => {
//     const [modelGroup, context, analytics] = element;

//     if (context) {
//       const [seriesRangeCode, enableTechData, transmissionType] = context.children;
//     }

//     if (analytics) {
//       const [analyticsLabel, BtnType, btnSubType] = analytics.children;
//     }

//     if (modelGroup) {
//       const [modelCategory, modelLink, isSelected] = modelGroup.children;
//       element.textContent = '';
//       if (isSelected) {
//         element.append(
//           document.createRange().createContextualFragment(`
//                 <span>${modelCategory.textContent}</span>
//                 <span></span>`),
//         );
//         selectedModelDdlMob.textContent = modelCategory.textContent;
//       } else {
//         element.append(
//           document.createRange().createContextualFragment(`
//                 <span>${modelCategory.textContent}</span>
//                 <a href='${modelLink.textContent}'></a>`),
//         );
//       }
//       const modelListItem = document.createElement('li');
//       modelListItem.append(element);
//       leftPanelModelGrouping.append(modelListItem);
//     }
//   });

//   block.textContent = '';
// }
