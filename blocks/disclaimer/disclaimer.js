import {
  DEV, STAGE, PROD, disclaimerGQlEndpoint,
} from '../../scripts/common/constants.js';

async function getContentFragmentData(disclaimerCFPath, gqlOrigin) {
  try {
    const endpointUrl = gqlOrigin + disclaimerGQlEndpoint + disclaimerCFPath.innerText;
    const response = await fetch(endpointUrl);
    return await response.json();
  } catch (error) {
    console.log('Error fetching data for content fragment', error);
    throw error;
  }
}

// const data = {
//   data: {
//     disclaimercfmodelByPath: {
//       item: {
//         _path: '/content/dam/metafox/disclaimer-content-fragment/rs/f1-disclaimer-model',
//         disclaimer: {
//           html: "<p>Disclaimer description text</p>\n<p><a href=\"https://www.bmw.rs\">https://www.bmw.rs</a></p>\n<ul>\n<li>Disclaimer Property 1</li>\n<li>Disclaimer Property 2</li>\n<li>Disclaimer Property 3</li>\n<li>Disclaimer Property 4</li>\n</ul>\n<ol>\n<li>Disclaimer</li>\n<li>Disclaimer</li>\n<li>Disclaimer'</li>\n<li>Disclaimer</li>\n</ol>\n",
//         },
//       },
//     },
//   },
// };

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const env = document.querySelector('meta[name="env"]');
  let publishDomain = '';
  const [disclaimerCF] = props;
  if (env === 'dev') {
    publishDomain = DEV.hostName;
  } else if (env === 'stage') {
    publishDomain = STAGE.hostName;
  } else {
    publishDomain = PROD.hostName;
  }
  window.gqlOrigin = window.location.hostname.match('^(.*.hlx\\.(page|live))|localhost$') ? publishDomain : '';
  getContentFragmentData(disclaimerCF, window.gqlOrigin).then((response) => {
    const cfData = response.data;
    if (cfData) {
      block.textContent = '';
      block.textContent = '';
      const disclaimerHtml = cfData.data.disclaimercfmodelByPath.item.disclaimer.html;
      const div = document.createElement('div');
      div.className = 'disclaimer-content';
      div.innerHTML = disclaimerHtml;
      block.appendChild(div);
    }
  });
}
