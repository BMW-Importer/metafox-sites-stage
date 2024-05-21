import { generatebgImgDom } from "../background-image/background-image.js";
import { generatebgVideoDom } from "../background-video/background-video.js";

export default function decorate(block) {
    // get children blocks
    const bgMediaChildrens = [...block.children];
    block.textContent = '';

    // loop through each children block to extract props of it
    bgMediaChildrens.forEach((childrenBlock) => {
        const [generalProps, vidOrImgPros, cta1, cta2] = childrenBlock.children;
        childrenBlock.textContent = '';
        childrenBlock.classList.add('background-media-item');

        generalProps?.classList.add("background-media-item-text");
        vidOrImgPros?.classList.add("background-media-item-vidImg");
        cta1?.classList.add("background-media-item-cta-money");
        cta2?.classList.add("background-media-item-cta-ghost");

        // checking whether current childBlock is background-image or background-video
        if (vidOrImgPros?.children?.length === 1) {
            vidOrImgPros.classList.add('image');
            vidOrImgPros.append(generatebgImgDom(vidOrImgPros));
            childrenBlock.append(vidOrImgPros);
        }
        else if(vidOrImgPros?.children?.length > 1){
            vidOrImgPros.classList.add('video');
            generatebgVideoDom(vidOrImgPros);
            childrenBlock.append(vidOrImgPros);
        }

        // fetching eyebrow, headline, class list details
        const [eyebrowText, headlineText, subBrancdIcon, copytext, classes] = generalProps.children;
        generalProps.textContent = '';
        const listOfClasses = classes ? classes.textContent.split(',') : '';

        // adding class names to eyebrow and headline
        if(eyebrowText) eyebrowText.classList.add('background-media-item-text-eyebrow');
        if(headlineText) headlineText.classList.add('background-media-item-text-headline');
        if(copytext) copytext.classList.add('background-media-item-text-copytext');

        // if gradient is authored, then add it as classnames to image or video div
        if (listOfClasses) {
            listOfClasses.forEach((className) => {
                vidOrImgPros.classList.add(className);
            });
        }

        generalProps.append(eyebrowText || '');
        generalProps.append(headlineText || '');

        const detailAndBrandDiv = document.createElement('div');
        detailAndBrandDiv.classList.add('background-media-item-details');

        // if subrand icon is selected then add it as class
        if (subBrancdIcon) detailAndBrandDiv.classList.add(subBrancdIcon.textContent);
        detailAndBrandDiv.append(copytext || '');

        // append copyText detail
        generalProps.append(detailAndBrandDiv);

        // extracting classnames for cta and binding it to anchor link
        if (cta1?.children.length > 1) {
            const [ctaButton1, ctaBtn1Class] = cta1.children;
            cta1.textContent = '';
            if (ctaButton1) {
                const bt1ClassName = ctaBtn1Class?.textContent.split(' ');
                if (ctaBtn1Class?.textContent) ctaButton1.querySelector('a')?.classList.add(...bt1ClassName);
            }
            cta1.append(ctaButton1);

            // appending buttons
            generalProps.append(cta1);
        }

        if (cta2?.children.length > 1) {
            const [ctaButton2, ctaBtn2Class] = cta2.children;
            cta2.textContent = '';
            if (ctaButton2) {
                const btn2ClassName = ctaBtn2Class?.textContent.split(' ');
                if (ctaBtn2Class?.textContent) ctaButton2.querySelector('a')?.classList.add(...btn2ClassName);
            }
            cta2.append(ctaButton2);
            generalProps.append(cta2);
        }
        
        childrenBlock.append(generalProps);

        // appending back child block back to main container
        block.append(childrenBlock);
    });
  }