import  { loadVideoEmbed } from "../video/video.js";
import { generateVideoDetailMarkUp } from "../video-slide/video-slide.js"
import { generateImgSlidePicture, generateImgSlideDetailMarkUp } from "../image-slide/image-slide.js";

let startTouchX = 0;
let endTouchX = 0;
const showMoreText = 'Prikaži više';
const showLessText = 'Prikaži manje';

(function(){  
  
  //delete
  setTimeout(function() {
    enableShowMoreButton();
    }, 5000);

    window.addEventListener('resize',function() {      
      enableShowMoreButton();
      triggerAfterResize();
    });   
})();

function triggerAfterResize(){
   //if screen widht is greater than 1280 then enable first element as opened card
   if(screen.width >= 1280){
    const multiMediaBlocks = document.querySelectorAll(".multicontent-gallery.block");

    multiMediaBlocks.forEach(item => {
      //scroll to starting of detail childs
      const detailContainer = item.querySelector('.video-image-detail-container');
      detailContainer.scrollTo({
        left: 0,
        behavior: 'smooth'
      });

      const mediaContainer = item.querySelector('.video-image-slide-conatiner').querySelectorAll('.video-image-slide.media');
      mediaContainer.forEach((media,index) => {
        media.classList.remove('visible');
      });

      //make first detail as open state
      // call click event for first click 
      const firstDetailHeadingElem = item.querySelector('.vid-img-slide-cover');
      if(firstDetailHeadingElem) {
        firstDetailHeadingElem.click();
      }
    });  
  }
}

function attachDetailHeadingClickEvent(block) {
  const desktopDetailHeadingElem = block.querySelectorAll(".vid-img-slide-cover");
  desktopDetailHeadingElem.forEach(elem => {
    elem.addEventListener('click', function(e){debugger;
      const listOfDetailHeading = e.target.closest('.video-image-detail-container').querySelectorAll('.vid-img-slide-cover');
      listOfDetailHeading.forEach(function(childElem,index){
        const parentBlock = childElem.closest(".multicontent-gallery.block");
        let mediaElement;
        if(parentBlock){
          mediaElement = parentBlock.querySelectorAll(".video-image-slide-conatiner .video-image-slide.media");
        }
        if(elem === childElem){
          childElem.classList.add("clicked");
          if(mediaElement){
            mediaElement[index].classList.add('visible');
          }
          
        }
        else{
          childElem.classList.remove("clicked");
          mediaElement[index].classList.remove('visible');
        }
      });
    });
  });
}



function attachShowMoreEvents(block){
  const showMoreBtn = block.querySelectorAll('.vid-img-slide-showmore-btn-link');
  showMoreBtn.forEach(btnElem => {
    btnElem.addEventListener('click',(e) => {
      const parentDiv = e.target.closest(".vid-img-slide-expand-cover");
      const parentDivScrollHeight = parentDiv.scrollHeight;
      if(e.target.closest('.vid-img-slide-showmore-btn').classList.contains('showless')){
        e.target.closest('.vid-img-slide-showmore-btn').classList.remove('showless');
        e.target.text = showMoreText;
        e.target.closest(".vid-img-slide-expand-cover").style.minHeight = 'unset';      
      }
      else{
        e.target.closest('.vid-img-slide-showmore-btn').classList.add('showless');
        e.target.text = showLessText;
        e.target.closest(".vid-img-slide-expand-cover").style.minHeight = `${parentDivScrollHeight}px`;      
      }
    });
  })    
}

function enableShowMoreButton(){
  const detailContainer = document.querySelectorAll('.vid-img-slide-expand-cover');
  detailContainer.forEach(item => {
    const height = item.clientHeight;
    const scrollHeight = item.scrollHeight;
    const showMoreBtn = item.querySelector('.vid-img-slide-showmore-btn');
    if(showMoreBtn) {
      if(scrollHeight > height){      
        showMoreBtn.classList.remove('hidden');
      }
      else{
        showMoreBtn.classList.add('hidden');
      }      
    }    
  });
}

function handleSwipe(galleryContainer){
  const swipeDistance = startTouchX - endTouchX;
  const children = galleryContainer.querySelectorAll(".vid-img-slide.detail");
  const cardWidth = galleryContainer.querySelector(".vid-img-slide.detail").offsetWidth;
  const containerSwipedDistance = galleryContainer.scrollLeft;
  let indexToSwipe;
  if(swipeDistance > 0){
    indexToSwipe = Math.ceil(containerSwipedDistance/cardWidth);
  }
  else{
    indexToSwipe = Math.floor(containerSwipedDistance/cardWidth);
  }

  if(indexToSwipe === 0){
    galleryContainer.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
  else{
    galleryContainer.scrollTo({
      left: children[indexToSwipe].offsetLeft,
      behavior: 'smooth'
    });
  }
  

  const videoImgGalleryElems = galleryContainer.parentElement.querySelector('.video-image-slide-conatiner').querySelectorAll('.video-image-slide.media');
  videoImgGalleryElems.forEach((item,index) => {
    if(index === indexToSwipe){
      item.classList.add('visible');
    }
    else{
      item.classList.remove('visible');
    }
  });
}

function attachSlideEvents(galleryContainer){
  galleryContainer.addEventListener('touchstart', (e) => {
    startTouchX = e.touches[0].clientX;
  });
  galleryContainer.addEventListener('touchend', (e) => {
    endTouchX = e.changedTouches[0].clientX;
    handleSwipe(galleryContainer);
  });
}

export default function decorate(block) {
  const videoImageContainer = document.createElement('div');
  videoImageContainer.classList.add("video-image-slide-conatiner");

  const videoImageDetailsContainer = document.createElement('div');
  videoImageDetailsContainer.classList.add("video-image-detail-container");
  attachSlideEvents(videoImageDetailsContainer);

  // get all children elements
  const panels = [...block.children];

  // loop through all children blocks
  [...panels].forEach((panel,index) => {
    const [classList] = panel.children;
    const classesText = classList.textContent.trim();
    const classes = (classesText ? classesText.split(',') : []).map((c) => c?.trim()).filter((c) => !!c);
    
    // checking which is current block children
    if([...classes].includes('video-slide')) {
      const [className,videoSlideTab1,videoSlideHeadline,videoSlideCopyText,videoSlideTab2,videoSlideTitle,videoSlideDescription,videoSlideDesktopVideoRef,
        videoSlideMobileVideoRef,videoSlideDesktopPosterImgRef,videoSlideMobilePosterImgRefaltText,videoSlideLoopVideo,videoSlideAutoplay,videoSlideTab3,videoSlideLinkLabel,
        videoSlideLink,videoSlideButtonStyling] = panel.children;

      const videoDOMContainer = document.createElement('div');
      videoDOMContainer.classList.add('video-image-slide','media');
      videoDOMContainer.classList.add('video-image-slide-'+index);
      if(index === 0){
        videoDOMContainer.classList.add("visible");
      }      

      const desktopVideoPosterImgPath = videoSlideDesktopPosterImgRef.querySelector('img').getAttribute('src');

      // generating video
      //delete replace link with 'videoSlideDesktopVideoRef.textContent.trim()
      loadVideoEmbed(videoDOMContainer,videoSlideDesktopVideoRef.textContent.trim(),true,videoSlideLoopVideo.textContent.trim(),false,true,desktopVideoPosterImgPath)

      //call function for generating video slide UI
      videoImageContainer.append(videoDOMContainer);

      //call function to generate video detail div
      videoImageDetailsContainer.append(generateVideoDetailMarkUp([videoSlideHeadline.textContent.trim(),videoSlideCopyText.innerHTML,videoSlideTitle.textContent.trim(),videoSlideDescription.textContent.trim(),videoSlideLinkLabel.textContent.trim(),videoSlideLink.textContent.trim(),videoSlideButtonStyling.textContent.trim(),index]));
      
    }
    else if([...classes].includes('image-slide')){    
      const [imageSlideClassname,imageSlideTab1,imageSlideHeadline,imageSlideCopyText,imageSlideTab2,
        imageSlideImgRef,imageSlideAltText,imageSlideTab3,imageSlideLinkLabel,imageSlideLink,imageSlideButtonStyling] = panel.children;

        const imgDOMContainer = document.createElement('div');
        imgDOMContainer.classList.add('video-image-slide','media');
        imgDOMContainer.classList.add('video-image-slide-'+index);
        if(index === 0){
          imgDOMContainer.classList.add("visible");
        } 
        if(imageSlideClassname?.textContent) {
          imgDOMContainer.classList.add(imageSlideClassname.textContent);
        }

        //append picture to imgDomContainer div
        generateImgSlidePicture([imgDOMContainer,imageSlideImgRef,imageSlideAltText.textContent.trim()])     

        //call function for generating image slide UI
        videoImageContainer.append(imgDOMContainer);

        //call function for generating image slide details
        videoImageDetailsContainer.append(generateImgSlideDetailMarkUp([imageSlideHeadline.textContent.trim(),imageSlideCopyText.textContent.trim(),imageSlideLinkLabel.textContent.trim(),imageSlideLink.textContent.trim(),imageSlideButtonStyling.textContent.trim(),index]));
    }    
    panel.textContent = '';
  }); 

  block.textContent = ''; 
  block.append(videoImageContainer);  
  block.append(videoImageDetailsContainer);

  // attache events for details div
  attachShowMoreEvents(block);
  // attach click event for desktop heading click
  attachDetailHeadingClickEvent(block);
  triggerAfterResize();
}

