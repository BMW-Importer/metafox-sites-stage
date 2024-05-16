function iframeLoader() {
  const iframeCont = document.getElementById('bmwIframe');
  if(iframeCont){
    const loading = document.querySelector('.loader');
    iframeCont.addEventListener('load', () => {
      loading.style.display = 'none';
      iframeCont.style.opacity = 1;
    });
  }
}
export function generateIFrameDOM(props) {
  // Extract properties, always same order as in model, empty string if not set
  const [iFrameUrl] = props;
  const iframeSrc = iFrameUrl.textContent;
  opt_in_info();
  console.log("iframe URL : "+iframeSrc);
  let anchor = iframeSrc;
  alloy("appendIdentityToUrl", {url: iframeSrc}).then(result=> {anchor = result.url;});
  console.log("anchor : "+anchor);

  // Build DOM
  const iFrameDOM = document.createRange().createContextualFragment(`
      <div class="iframe-container">
      <iframe src="${anchor}" id="bmwIframe" style="border: 0; width: 100%; height: 100%; min-height: 900px;">
      </iframe>
      <div class="loader"></div>
       </div>
    `);
  return iFrameDOM;
}

function opt_in_info(){
  const dateTime = new Date();

// Format the date components
const year = dateTime.getFullYear();
const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = dateTime.getDate().toString().padStart(2, '0');
const hours = dateTime.getHours().toString().padStart(2, '0');
const minutes = dateTime.getMinutes().toString().padStart(2, '0');
const seconds = dateTime.getSeconds().toString().padStart(2, '0');
const milliseconds = dateTime.getMilliseconds().toString().padStart(3, '0');
const timezoneOffset = -dateTime.getTimezoneOffset();
const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, '0');
const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
const timezoneSign = timezoneOffset >= 0 ? '+' : '-';

// Construct the timestamp string
const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;

  const adobeDtm = window.adobeDataLayer;
  console.log(adobeDtm.version);
  const d = new Date();
  alloy('setConsent', {
    consent: [{
      standard: 'Adobe',
      version: '2.0',
      value: {
        collect: {
          val: 'y'
        },
        metadata: {
          time: timestamp
        }
      }
    }]
  });
}

export default function decorate(block) {
  // get the first and only cell from each row
  const props = [...block.children].map((row) => row.firstElementChild);
  const iFrameDOM = window.setTimeout(() => { generateIFrameDOM(props) }, 2000);
  block.textContent = '';
  block.append(iFrameDOM);
}
