export default async function decorate(block) {
  const panels = [...block.children];
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
  // loop through all children blocks
  [...panels].forEach((panel) => panel.children);
}
