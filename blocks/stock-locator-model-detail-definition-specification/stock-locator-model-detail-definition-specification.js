export default async function decorate(block) {
  const modelDetails = [...block.children];
  modelDetails.forEach(modelDetail => {
    const [general, analytics] = modelDetail.children;
    let data = general.querySelectorAll('p');
    const rfoButtonLabel = data[0] || '';
    const rfoButtonSty = data[1] || '';
    const dealerLocatioBtn = data[2] || '';
    const dealerLocatioBtnSty = data[3] || '';
    const infoIconTxt = data[4] || '';
    const fallBckImgOpt = data[5] || '';
    const disclaimer = data[6] || '';
});
};
