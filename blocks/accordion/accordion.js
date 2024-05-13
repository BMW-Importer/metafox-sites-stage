export default async function decorate(block) {
  const panels = [...block.children];
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
  // loop through all children blocks
  [...panels]?.forEach((panel) => {
    const [accordionLabel, copyText, accorCollapes] = panel.children;
    console.log(accordionLabel.textContent, copyText.textContent, accorCollapes.textContent);
  });
}
