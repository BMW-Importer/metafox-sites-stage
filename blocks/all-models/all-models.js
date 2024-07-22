export default function decorate(block) {
  const [description, analytics ] = [...block.children];
  const contentNavDesc = description?.querySelector('h2') || '';
  const activateConfigVar = description?.querySelector('h3') || '';
  const filterSpreadsheet = description?.querySelector('h5') || '';
  const modelOverviewSpreadsheet = description?.querySelector('h6') || '';

  const allModelParentContainer = document.createElement('div');
  allModelParentContainer.classList.add('all-model-parent-div');
  const modelTitle = document.createElement('h2');
  modelTitle.innerHTML = "Find your BMW";

  const filterTitle = description.querySelector('h4');
  filterTitle.classList.add('filter-title');
 
  const buttonRow = document.createElement('div');
  buttonRow.classList.add('filter-btn-row');

  const hybridButton = document.createElement('button');
  hybridButton.classList.add('filter-btn');
  hybridButton.innerHTML = `<span class='filter-btn-icon'></span><span class='btn-text'>Plug-in Hybrid</span>`;
  
  const electricButton = document.createElement('button');
  electricButton.classList.add('filter-btn');
  electricButton.innerHTML = `<span class='filter-btn-icon'></span><span class='btn-text'>Electric</span>`;

  const mButton = document.createElement('button');
  mButton.classList.add('filter-btn');
  mButton.innerHTML = `<span class='filter-btn-icon'></span><span class='btn-text'>BMW M</span>`;

  const iButton = document.createElement('button');
  iButton.classList.add('filter-btn');
  iButton.innerHTML = `<span class='filter-btn-icon'></span><span class='btn-text'>BMW i</span>`;
  
  const overlayContainer = document.createElement('div');

  const showMoreButton = document.createElement('button');
  showMoreButton.classList.add('show-more-btn');
  showMoreButton.innerHTML = `<span class='show-more-icon'></span><span class='show-more-text'>Show more filters</span>`;

  const numberWrap = document.createElement('div');
  numberWrap.classList.add('number-wrap');
  numberWrap.innerHTML = `<span class='total-number'>99</span>&nbsp;<span class='found-text'>found vehicles</span>`;
  
  buttonRow.append(hybridButton);
  buttonRow.append(electricButton);
  buttonRow.append(mButton);
  buttonRow.append(iButton);
  overlayContainer.append(showMoreButton);

  allModelParentContainer.append(modelTitle);
  allModelParentContainer.append(filterTitle);
  allModelParentContainer.append(buttonRow);
  allModelParentContainer.append(overlayContainer);
  allModelParentContainer.append(numberWrap);
  block.append(allModelParentContainer);
  

  selectModelClick(hybridButton);
  selectModelClick(electricButton);
  selectModelClick(mButton);
  selectModelClick(iButton);
}

function selectModelClick(button) {
  button.addEventListener('click', (e) => {
    const parentElem = e.target.parentElement;
    if(parentElem.localName == 'button'){
    if(!parentElem.firstChild.classList.contains('toggle-icon')){
      parentElem.firstChild.classList.add('toggle-icon');
      parentElem.style.background = '#4d4d4d';
      parentElem.style.color = '#f6f6f6';
    }
    else {
      parentElem.firstChild.classList.remove('toggle-icon');
      parentElem.style.background = 'transparent';
      parentElem.style.color = '#666';
    }}
  });
}
