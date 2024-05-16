import { generatebgImgDom } from "../background-image/background-image.js";
import { generatebgVideoDom } from "../background-video/background-video.js";

export default function decorate(block) {
    // get children blocks
    const bgMediaChildrens = [...block.children];
    const bgMediaContainer = document.createElement('div');
    bgMediaContainer.classList.add('background-media-container');

    // loop through each children block to extract props of it
    bgMediaChildrens.forEach((childrenBlock) => {
        const [generalProps, vidOrImgPros, cta1, cta2] = childrenBlock.children;
        const childrenBlockDom = document.createElement('div');
        childrenBlockDom.classList.add('background-media-item');

        generalProps.classList.add("background-media-item-text");
        vidOrImgPros.classList.add("background-media-item-vidImg");
        cta1.classList.add("background-media-item-cta-money");
        cta2.classList.add("background-media-item-cta-ghost");

        // checking whether current childBlock is background-image or background-video
        if (vidOrImgPros?.children?.length === 1) {
            vidOrImgPros.classList.add('image');
            vidOrImgPros.append(generatebgImgDom(vidOrImgPros));
            childrenBlockDom.append(vidOrImgPros);
        }
        else {
            vidOrImgPros.classList.add('video');
            vidOrImgPros.append(generatebgVideoDom(vidOrImgPros));
            childrenBlockDom.append(vidOrImgPros);
        }

        // fetching eyebrow, headline, class list details
        const [eyebrowText, headlineText, subBrancdIcon, copytext, classes] = generalProps.children;
        generalProps.textContent = '';

        // if gradient is authored, then add it as classnames to image or video div
        if (classes) vidOrImgPros.classList.add(classes.replace(/,/g, ' '));

        generalProps.append(eyebrowText || '');
        generalProps.append(headlineText || '');

        const detailAndBrandDiv = document.createElement('div');
        detailAndBrandDiv.classList.add('background-media-item-details');

        // if subrand icon is selected then add it as class
        if (subBrancdIcon) detailAndBrandDiv.classList.add(subBrancdIcon);

        // append copyText detail
        generalProps.append(copytext || '');

        childrenBlockDom.append(generalProps);
        
        // appending buttons
        childrenBlockDom.append(cta1);
        childrenBlockDom.append(cta2);

        // emptying child block content
        childrenBlock.textContent = "";

        // appending the generated dom back to child element
        childrenBlock.append(childrenBlockDom);

        // appending back child block back to main container
        bgMediaContainer.append(childrenBlock);
    });
    
    block.textContent = '';
    block.append(bgMediaContainer);
  }