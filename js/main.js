document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const topLayer = main.querySelector('.top');
    const handle = main.querySelector('.handle');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const images = main.querySelectorAll('img');
    const topButton = main.querySelector('.top a');
    const bottomButton = main.querySelector('.bottom a');

    let centered = true;

    this.addEventListener('orientationchange', onOrientationChange.bind(null, handle, topLayer));

    images.forEach(image => {
        image.addEventListener('mouseenter', () => {
            if (!centered) { image.classList.add('large'); }
        });

        image.addEventListener('mouseleave', () => {
            if (!centered) { image.classList.remove('large'); }
        });

        image.addEventListener('touchstart', onImageClick.bind(null, image));
        image.addEventListener('click', onImageClick.bind(null, image));
    });

    rightArrow.addEventListener('click', () => {
        if (centered) {
            styleHandleAndTopLayer(handle, topLayer, 105);
            styleArrow(rightArrow, 0, 0);

            bottomButton.classList.add('hidden');
            centered = false;
        } else {
            styleHandleAndTopLayer(handle, topLayer, 50);
            styleArrow(leftArrow, 1, 5);

            topButton.classList.remove('hidden');
            centered = true;
        }
    });

    leftArrow.addEventListener('click', () => {
        if (centered) {
            styleHandleAndTopLayer(handle, topLayer, -5);
            styleArrow(leftArrow, 0, 0);

            topButton.classList.add('hidden');
            centered = false;
        } else {
            styleHandleAndTopLayer(handle, topLayer, 50);
            styleArrow(rightArrow, 1, 5);

            bottomButton.classList.remove('hidden');
            centered = true;
        }
    });
});

const onOrientationChange = (handle, topLayer) => {
    if (this.innerWidth <= 600) {
        styleHandleAndTopLayer(handle, topLayer, 50);
    }
};

const onImageClick = (image) => {
    if (this.innerWidth <= 600) {
        window.location = image.classList.contains('top-image') ? '/gallery.html' : '/contact.html';
    }
};

const styleHandleAndTopLayer = (handle, topLayer, value) => {
    handle.style.left = value + '%';
    topLayer.style.width = `calc(${value}vw + 1000px)`;
};


const styleArrow = (arrow, opacity, zIndex) => {
    arrow.style.opacity = opacity;
    arrow.style.zIndex = zIndex;
};