export default async function decorate(block) {
  const panels = [...block.children];
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
  // loop through all children blocks
  [...panels].forEach((panel) => {
    const [accordionItem, CopyText, collapseAccordion] = panel.children;
    console.log(accordionItem.textContent, CopyText.textContent, collapseAccordion.textContent);
  });
  block.textContent = '';
}
