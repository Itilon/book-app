document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const imageWrapper = main.querySelector('.image-wrapper');
    const imageOverlay = main.querySelector('.image-overlay');

    const images = Array.from(main.querySelectorAll('.gallery-item'));

    rightArrow.addEventListener('click', rightSlide.bind(null, images));
    leftArrow.addEventListener('click', leftSlide.bind(null, images));

    images.forEach(image => {
        image.addEventListener('click', resizeImage.bind(null, image, main));
    });

    imageWrapper.addEventListener('click', downsizeImage.bind(null, imageWrapper, main));
    imageOverlay.addEventListener('click', downsizeImage.bind(null, imageOverlay, main));
});

const rightSlide = (images) => {
    let visibleImageChanged = false;

    if (this.event.detail === 1) {
        images.forEach((image, i) => {
            if (image.classList.contains(('visible-item')) && !visibleImageChanged) {
                image.classList.remove('visible-item');

                const currentTextItemClass = image.id;
    
                const previousImage = images.find(image => image.classList.contains('previous-item'));
                previousImage.classList.remove('previous-item');
                previousImage.classList.add('visible-item');

                const nextTextItemClass = previousImage.id;
    
                const nextImage = images.find(image => image.classList.contains('next-item'));
                nextImage.classList.remove('next-item');
    
                image.classList.add('next-item');
                
                if (images[i - 2]) {
                    images[i - 2].classList.add('previous-item');
                } else if (images[i - 1]) {
                    images[images.length - 1].classList.add('previous-item');
                } else {
                    images[images.length - 2].classList.add('previous-item');
                }

                const currentArticle = document.querySelector(`.image-text-container .${currentTextItemClass}`);
                currentArticle.classList.add('hidden');
                const nextArticle = document.querySelector(`.image-text-container .${nextTextItemClass}`);
                nextArticle.classList.remove('hidden');
    
                visibleImageChanged = true;
            }
        });
    }
};

const leftSlide = (images) => {
    let visibleImageChanged = false;

    if (this.event.detail === 1) {
        images.forEach((image, i) => {
            if (image.classList.contains(('visible-item')) && !visibleImageChanged) {
                image.classList.remove('visible-item');

                const currentTextItemClass = image.id;
    
                const nextImage = images.find(image => image.classList.contains('next-item'));
                nextImage.classList.remove('next-item');
                nextImage.classList.add('visible-item');

                const nextTextItemClass = nextImage.id;
    
                const previousImage = images.find(image => image.classList.contains('previous-item'));
                previousImage.classList.remove('previous-item');
    
                image.classList.add('previous-item');
                
                if (images[i + 2]) {
                    images[i + 2].classList.add('next-item');
                } else if (images[i + 1]) {
                    images[0].classList.add('next-item');
                } else {
                    images[1].classList.add('next-item');
                }
                
                const currentArticle = document.querySelector(`.image-text-container .${currentTextItemClass}`);
                currentArticle.classList.add('hidden');
                const nextArticle = document.querySelector(`.image-text-container .${nextTextItemClass}`);
                nextArticle.classList.remove('hidden');
    
                visibleImageChanged = true;
            }
        });
    }
};

const resizeImage = (image, main) => {
    this.event.stopPropagation();

    if (this.event.detail === 1 && image.classList.contains('visible-item')) {
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
    main.querySelector('.image-text:not(.hidden)').classList.add('resized');

    main.querySelectorAll('i.fa').forEach(elt => elt.classList.add('hidden'));
};

const removeResizedClass = (main) => {
    main.querySelectorAll('.resized').forEach(element => {
        element.classList.contains('image-wrapper') || element.classList.contains('gallery-item-container') ?
            setTimeout(() => element.classList.remove('resized'), 600) :
            element.classList.remove('resized');
    });

   main.querySelectorAll('i.fa.hidden').forEach(elt => elt.classList.remove('hidden'));
};
