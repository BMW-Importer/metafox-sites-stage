export function generateAccordionDOM(props) {
  const { accordionItemLabel, CopyText, collapseAccordion } = props;

  const accordionDOM = document.createRange().createContextualFragment(`
    <div><div>${accordionItemLabel}</div></div>
    <div><div>${CopyText}</div></div>
    <div><div>${collapseAccordion}</div></div>

  `);
  return accordionDOM;
}
export default async function decorate(block) {
  const props = [...block.children].map((row) => {
    const [accordionItemLabel, CopyText, collapseAccordion] = Array.from(row.querySelectorAll('p')).map((p) => p.textContent);
    return { accordionItemLabel, CopyText, collapseAccordion };
  });

  const accordionProps = props.reduce((acc, row) => {
    Object.keys(row).forEach((key) => {
      if (!acc[key]) {
        acc[key] = '';
      }
      acc[key] += row[key];
    });
    return acc;
  }, {});

  const { accordionItemLabel, CopyText, collapseAccordion } = accordionProps;
  console.log(accordionItemLabel, CopyText, collapseAccordion);

  const accordionDOM = generateAccordionDOM(accordionProps);
  block.textContent = '';
  block.append(accordionDOM);
}
