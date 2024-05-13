async function buildGetPlaceholder(modelCode) {
  try {
    const endpointUrl = `/WDH_API/Models/ModelDetails/${modelCode[0]}/.json`;
    const response = await fetch(endpointUrl);
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log('Error fetching data for building get placeholder', error);
  }
}
export default function decorate(block) {
  console.log('Hello');
  const props = [...block.children].map((row) => row.firstElementChild);
  const [contentfragment] = props;
  console.log(contentfragment);
  const modelCode = ['7K11', '61FF'];
  buildGetPlaceholder(modelCode);
}
