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
  iframeLoader();
  return iFrameDOM;
}
export default function decorate(block) {
  // get the first and only cell from each row
  const props = [...block.children].map((row) => row.firstElementChild);
  const iFrameDOM = window.setTimeout(() => { generateIFrameDOM(props) }, 2000);
  block.textContent = '';
  block.append(iFrameDOM);
}
