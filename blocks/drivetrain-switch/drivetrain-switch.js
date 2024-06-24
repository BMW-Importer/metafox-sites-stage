export default function decorate(block) {
    const [
        headingCell,
        descriptionCell,
        technicalDataLinkCell,
        disclaimerLinkCell,
        factsCell,
        analyticsCell,
        ...rows
      ] = [...block.children].map((row, index) => {
        if (index < 5) row.firstElementChild
        else[...row.children]
      });
    
      let activeContext = null;
      const ul = document.createElement('ul');
      for (const [groupCell, linkCell, contextCell] of rows) {
        const [series, modelRange, modelCode] = contextCell.children[0].innerText.split(',');
        const transmitionType = contextCell.children[1]?.innerText;
        const group = groupCell.innerText;
        const context = { group, series, modelCode, modelRange, transmitionType };
        const li = document.createElement('li');
        const link = linkCell.querySelector('a');
        if (link.href === window.location.href) {
          activeContext = context;
          li.classList.add('active');
        }
        li.replaceChildren(a);
        // create model card content
        a.replaceChildren(...modelCardContent);
      };
    
      // prepend the picture to the children of the block using the activeContext
    
      headingCell.classList.add('heading');
      descriptionCell.classList.add('description');
      technicalDataLinkCell.classList.add('technical-data-link');
    
      factsCell.classList.add('technical-data');
      const dl = document.createElement('dl');
      [...factsCell.children].forEach((p, index) => {
        const el = document.createElement(index % 2 ? 'dt' : 'dd');
        el.innerHTML = p.innerHTML;
        dl.appendChild(el);
      });
    
      const disclaimerLink = disclaimerLinkCell.querySelector('a');
      // do something with disclaimerLink
    
      analyticsCell.remove();
      // do somethings with the content in the analytics cell
    
}