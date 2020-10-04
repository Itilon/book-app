document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const header = main.querySelector('header');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const imageOverlay = main.querySelector('.image-overlay');

    const imageContainers = Array.from(main.querySelectorAll('.gallery-item-container'));
    const images = main.querySelectorAll('.gallery-item');

    rightArrow.addEventListener('click', rightSlide.bind(null, rightArrow, imageContainers));
    leftArrow.addEventListener('click', leftSlide.bind(null, leftArrow, imageContainers));
    images.forEach(image => image.addEventListener('click', resizeImage.bind(null, image, rightArrow, leftArrow, header, imageOverlay)));
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
    
                visibleImageChanged = true;
            }
        });
    }
};

const resizeImage = (image, rightArrow, leftArrow, header, imageOverlay) => {
    if (this.event.detail === 1 && image.classList.contains('resized')) {
        image.classList.remove('resized');
        image.parentElement.classList.remove('resized');
        header.classList.remove('resized');
        imageOverlay.classList.remove('resized');

        rightArrow.classList.remove('hidden');
        leftArrow.classList.remove('hidden');

        setTimeout(() => image.parentElement.parentElement.classList.remove('resized'), 600);
    } else if (this.event.detail === 1) {
        image.classList.add('resized');
        image.parentElement.classList.add('resized');
        header.classList.add('resized');
        imageOverlay.classList.add('resized');

        rightArrow.classList.add('hidden');
        leftArrow.classList.add('hidden');

        image.parentElement.parentElement.classList.add('resized');
    }
};