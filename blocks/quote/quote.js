export function generateQuoteDOM(props) {
  // Extract properties, always same order as in model, empty string if not set
  const [quote, source] = props;
  // Build DOM
  const quoteDOM = document.createElement('div');

  const quoteContainer = document.createElement('div');
  quoteContainer.classList.add('quote');
  quoteContainer.textContent = quote.textContent;
  quoteDOM.append(quoteContainer);

  const sourceContainer = document.createElement('div');
  sourceContainer.classList.add('source');
  sourceContainer.text = source.textContent;
  quoteDOM.append(sourceContainer);

  // Add final teaser DOM and classes if used as child component
  return quoteDOM;
}

export default function decorate(block) {
  const [quote, source] = block.children;
  quote.className = 'quote';
  source.className = 'source';
}
