import {
  DEV, STAGE, PROD, disclaimerGQlEndpoint,
} from '../../scripts/common/constants.js';
import { propsData } from '../stock-locator-model-detail-definition-specification/stock-locator-model-detail-definition-specification.js';

async function getContentFragmentData(disclaimerCFPath, gqlOrigin) {
  const endpointUrl = gqlOrigin + disclaimerGQlEndpoint + disclaimerCFPath.innerText;
  const response = await fetch(endpointUrl);
  return response.json();
}

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [modelButtonTxt, countAndDisclaimer, bannerContent] = props;
  const pTags = countAndDisclaimer.querySelectorAll('p');
  const countText = pTags[0] || '';
  const disclaimerCF = pTags[1] || '';

  const env = document.querySelector('meta[name="env"]').content;
  let publishDomain = '';
  if (env === 'dev') {
    publishDomain = DEV.hostName;
  } else if (env === 'stage') {
    publishDomain = STAGE.hostName;
  } else {
    publishDomain = PROD.hostName;
  }
  block.textContent = '';
  window.gqlOrigin = window.location.hostname.match('^(.*.hlx\\.(page|live))|localhost$') ? publishDomain : '';
  getContentFragmentData(disclaimerCF, window.gqlOrigin).then((response) => {
    const cfData = response?.data;
    propsData(modelButtonTxt, countText, cfData, bannerContent);
  });
}
