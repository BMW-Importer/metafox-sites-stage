// import {
//   DEV, STAGE, PROD, disclaimerGQlEndpoint,
// } from '../../scripts/common/constants.js';

// const env = document.querySelector('meta[name="env"]').content;
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

// export default function decorate(block) {
//     const [
//         detailCell,
//         disclaimerFragment,
//         technicalDetail1Cell,
//         technicalDetail2Cell,
//         ...rows
//     ] = [...block.children].map((row, index) => {
//         if (index < 4) {
//             return row.firstElementChild
//         } else {
//       return [...row.children];
//     }
//   });

//   // extracting detail cell
//   const labelSource = detailCell?.querySelector('h2');
//   const activeModelTitle = detailCell?.querySelector('h3');
//   const modelDescp = detailCell?.querySelector('h4');
//   const technicalLink = detailCell?.querySelector('a');
//   const popover = detailCell?.querySelector('h6');

//   // removing detailcell so that it wont appear in content tree
//   block.removeChild(detailCell);

//   // disclaimer fragment
//   const [disclaimerCF] = disclaimerFragment?.firstElementChild;
//   window.gqlOrigin = window.location.hostname.match('^(.*.hlx\\.(page|live))|localhost$') ? publishDomain : '';
//   getContentFragmentData(disclaimerCF, window.gqlOrigin).then((response) => {
//     const cfData = response?.data;
//     if (cfData) {
//       const disclaimerHtml = cfData?.disclaimercfmodelByPath?.item?.disclaimer?.html;
//       const disclaimerContent = document.createElement('div');
//       disclaimerContent.className = 'disclaimer-content';
//       disclaimerContent.innerHTML = disclaimerHtml;
//       block.removeChild(disclaimerFragment);
//     }
//   });

//   // extracting technical data
//   const dataFactLabel1 = technicalDetail1Cell?.querySelector('h1');
//   const dataFactVal1 = technicalDetail1Cell?.querySelector('h2');

//   const dataFactLabel2 = technicalDetail1Cell?.querySelector('h3');
//   const dataFactVal2 = technicalDetail1Cell?.querySelector('h4');

//   const dataFactLabel3 = technicalDetail1Cell?.querySelector('h5');
//   const dataFactVal3 = technicalDetail1Cell?.querySelector('h6');

//   const dataFactLabel3 = technicalDetail1Cell?.querySelector('h5');
//   const dataFactVal3 = technicalDetail1Cell?.querySelector('h6');

//   // removing techdetail1 so that it wont appear in content tree
//   block.removeChild(technicalDetail1Cell);

//   const dataFactLabel4 = technicalDetail2Cell?.querySelector('h1');
//   const dataFactVal4 = technicalDetail2Cell?.querySelector('h2');

//   // removing techdetail1 so that it wont appear in content tree
//   block.removeChild(technicalDetail2Cell);
// }


