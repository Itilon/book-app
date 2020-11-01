window.xDown = null;
window.yDown = null;

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const imageWrapper = main.querySelector('.image-wrapper');
    const imageOverlay = main.querySelector('.image-overlay');

    const imageContainers = Array.from(main.querySelectorAll('.gallery-item-container'));
    const images = main.querySelectorAll('.gallery-item');

    rightArrow.addEventListener('click', rightSlide.bind(null, rightArrow, imageContainers));
    leftArrow.addEventListener('click', leftSlide.bind(null, leftArrow, imageContainers));
    images.forEach(image => {
        image.addEventListener('click', resizeImage.bind(null, image, main));
        image.addEventListener('touchstart', onTouchStart);
        image.addEventListener('touchmove', onTouchMove.bind(null, image, imageContainers));
    });
    imageWrapper.addEventListener('click', downsizeImage.bind(null, imageWrapper, main));
    imageOverlay.addEventListener('click', downsizeImage.bind(null, imageOverlay, main));
});

const rightSlide = (rightArrow, imageContainers) => {
    let visibleImageChanged = false;

    if (this.event.detail === 1 && !rightArrow.classList.contains('hidden')) {
        imageContainers.forEach((container, i) => {
            if (container.classList.contains(('visible-item')) && !visibleImageChanged) {
                container.classList.remove('visible-item');
    
                const previousContainer = imageContainers.find(container => container.classList.contains('previous-item'));
                previousContainer.classList.remove('previous-item');
                previousContainer.classList.add('visible-item');
    
                const nextContainer = imageContainers.find(container => container.classList.contains('next-item'));
                nextContainer.classList.remove('next-item');
    
                container.classList.add('next-item');
                
                if (imageContainers[i - 2]) {
                    imageContainers[i - 2].classList.add('previous-item');
                } else if (imageContainers[i - 1]) {
                    imageContainers[imageContainers.length - 1].classList.add('previous-item');
                } else {
                    imageContainers[imageContainers.length - 2].classList.add('previous-item');
                }

                const textContainers = document.querySelectorAll('.image-text-container');
                textContainers[i].classList.add('hidden');
                textContainers[i - 1] ? textContainers[i - 1].classList.remove('hidden') : textContainers[imageContainers.length - 1].classList.remove('hidden');
    
                visibleImageChanged = true;
            }
        });
    }
};

const leftSlide = (leftArrow, imageContainers) => {
    let visibleImageChanged = false;

    if (this.event.detail === 1 && !leftArrow.classList.contains('hidden')) {
        imageContainers.forEach((container, i) => {
            if (container.classList.contains(('visible-item')) && !visibleImageChanged) {
                container.classList.remove('visible-item');
    
                const nextContainer = imageContainers.find(container => container.classList.contains('next-item'));
                nextContainer.classList.remove('next-item');
                nextContainer.classList.add('visible-item');
    
                const previousContainer = imageContainers.find(container => container.classList.contains('previous-item'));
                previousContainer.classList.remove('previous-item');
    
                container.classList.add('previous-item');
                
                if (imageContainers[i + 2]) {
                    imageContainers[i + 2].classList.add('next-item');
                } else if (imageContainers[i + 1]) {
                    imageContainers[0].classList.add('next-item');
                } else {
                    imageContainers[1].classList.add('next-item');
                }
                
                const textContainers = document.querySelectorAll('.image-text-container');
                textContainers[i].classList.add('hidden');
                textContainers[i + 1] ? textContainers[i + 1].classList.remove('hidden') : textContainers[0].classList.remove('hidden');
    
                visibleImageChanged = true;
            }
        });
    }
};

const resizeImage = (image, main) => {
    this.event.stopPropagation();

    if (this.event.detail === 1 && image.offsetParent.classList.contains('visible-item')) {
        if (image.classList.contains('resized')) {
            removeResizedClass(document.querySelector('.main'));
        } else {
            addResizedClass(image, main);
        }
    } else if (this.event.detail === 1) {
        removeResizedClass(document.querySelector('.main'));
    }
};

const downsizeImage = (element, main) => {
    if (element.classList.contains('resized')) {
        removeResizedClass(main);
    }
};

const addResizedClass = (image, main) => {
    image.classList.add('resized');
    image.parentElement.classList.add('resized');

    main.querySelector('header').classList.add('resized');
    main.querySelector('.image-overlay').classList.add('resized');
    main.querySelector('.image-wrapper').classList.add('resized');

    main.querySelectorAll('i.fa').forEach(elt => elt.classList.add('hidden'));
};

const removeResizedClass = (main) => {
    main.querySelectorAll('.resized').forEach(element => {
        element.classList.contains('image-wrapper') ?
            setTimeout(() => element.classList.remove('resized'), 600) :
            element.classList.remove('resized');
    });

   main.querySelectorAll('i.fa.hidden').forEach(elt => elt.classList.remove('hidden'));
};

const onTouchStart = () => {
    this.xDown = this.event.touches[0].clientX;
    this.yDown = this.event.touches[0].clientY;
};

const onTouchMove = (image, imageContainers) => {
    let visibleImageChanged = false;

    if (!image.classList.contains('resized') && this.xDown) {
        const xUp = this.event.touches[0].clientX;
        const yUp = this.event.touches[0].clientY;                                    

        const xDiff = this.xDown - xUp;
        const yDiff = this.yDown - yUp;

        if ((Math.abs(xDiff) > Math.abs(yDiff)) && xDiff > 0) {
            imageContainers.forEach((container, i) => {
                if (container.classList.contains(('visible-item')) && !visibleImageChanged) {
                    container.classList.remove('visible-item');
        
                    const nextContainer = imageContainers.find(container => container.classList.contains('next-item'));
                    nextContainer.classList.remove('next-item');
                    nextContainer.classList.add('visible-item');
        
                    const previousContainer = imageContainers.find(container => container.classList.contains('previous-item'));
                    previousContainer.classList.remove('previous-item');
        
                    container.classList.add('previous-item');
                    
                    if (imageContainers[i + 2]) {
                        imageContainers[i + 2].classList.add('next-item');
                    } else if (imageContainers[i + 1]) {
                        imageContainers[0].classList.add('next-item');
                    } else {
                        imageContainers[1].classList.add('next-item');
                    }
                    
                    const textContainers = document.querySelectorAll('.image-text-container');
                    textContainers[i].classList.add('hidden');
                    textContainers[i + 1] ? textContainers[i + 1].classList.remove('hidden') : textContainers[0].classList.remove('hidden');

                    visibleImageChanged = true;
                }
            });
        } else if ((Math.abs(xDiff) > Math.abs(yDiff))) {
            imageContainers.forEach((container, i) => {
                if (container.classList.contains(('visible-item')) && !visibleImageChanged) {
                    container.classList.remove('visible-item');
        
                    const previousContainer = imageContainers.find(container => container.classList.contains('previous-item'));
                    previousContainer.classList.remove('previous-item');
                    previousContainer.classList.add('visible-item');
        
                    const nextContainer = imageContainers.find(container => container.classList.contains('next-item'));
                    nextContainer.classList.remove('next-item');
        
                    container.classList.add('next-item');
                    
                    if (imageContainers[i - 2]) {
                        imageContainers[i - 2].classList.add('previous-item');
                    } else if (imageContainers[i - 1]) {
                        imageContainers[imageContainers.length - 1].classList.add('previous-item');
                    } else {
                        imageContainers[imageContainers.length - 2].classList.add('previous-item');
                    }
    
                    const textContainers = document.querySelectorAll('.image-text-container');
                    textContainers[i].classList.add('hidden');
                    textContainers[i - 1] ? textContainers[i - 1].classList.remove('hidden') : textContainers[imageContainers.length - 1].classList.remove('hidden');
        
                    visibleImageChanged = true;
                }
            });
        }

        this.xDown = null;
        this.yDown = null;
    }
};
