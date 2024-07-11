export function generateCookiePolicyDOM() {
  const CookiePolicyDOM = document.createRange().createContextualFragment(`
     <div class="epaas-policy-page-container"></div>
    `);
  return CookiePolicyDOM;
}

export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const CookiePolicyDOM = generateCookiePolicyDOM(props);
  block.textContent = '';
  block.append(CookiePolicyDOM);
}
