function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}
export default function decorate(block) {
  const panels = [...block.children];
  [...panels].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    if (!hasWrapper(summary)) {
      summary.innerHTML = `<p>${summary.innerHTML}</p>`;
    }
    // decorate accordion item body
    const body = row.children[2];
    body.className = 'accordion-item-body';
    if (!hasWrapper(body)) {
      body.innerHTML = `<p>${body.innerHTML}</p>`;
    }

    const collapse = row.children[1].firstElementChild?.textContent.trim() === 'true';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    // collapse by default if toggle is on
    if (collapse) {
      details.setAttribute('open', '');
    }
    details.append(summary, body);
    row.textContent = '';
    row.append(details);
    block.append(row);
    // row.replaceWith(details);
  });
}
