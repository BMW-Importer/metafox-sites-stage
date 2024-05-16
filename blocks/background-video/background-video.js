/* this function also gets called by backgroud media */
export function generatebgVideoDom(block) {
    const [pictureElement] = block.children;
   
    return "";
  }
  
  export default function decorate(block) {
    const dom = generatebgVideoDom(block);
    block.textContent = '';
    block.append(dom);
  }