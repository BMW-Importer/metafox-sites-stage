/* function hasWrapper(el) {
 return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
 } */
export default function decorate(block) {
  const panels = [...block.children];
  [...panels].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    const collapse = row.children[2].firstElementChild?.textContent.trim() === 'true';
    // decorate accordion item
    const details = document.createElement('details');
    // details.className = 'accordion-item';
    // collapse by default if toggle is on
    if (collapse) {
      details.setAttribute('open', '');
    }
    details.append(summary, body);
    row.textContent = '';
    row.append(details);
    // row.replaceWith(details);
    // block.append(details);
  });
}
