export default function decorate(block) {
  const anchorEle = block.querySelector('a');
  if (anchorEle) anchorEle.target = '_blank';
}

// Define the custom validation function
export function validateFileType(value) {
  const allowedExtensions = ['pdf', 'xls', 'xlsx'];
  const fileExtension = value.split(
    '.',
  )
    .pop()
    .toLowerCase();
  if (!allowedExtensions
    .includes(fileExtension)) {
    return false;
    // Validation failed
  }
  return true;
// Validation passed
}
// Attach the function to the global scope
window.validateFileType = validateFileType;
