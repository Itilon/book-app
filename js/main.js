document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const topLayer = main.querySelector('.top');
    const handle = main.querySelector('.handle');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const galleryImage = main.querySelector('.fa-file-picture-o');
    const shoppingCartImage = main.querySelector('.fa-shopping-cart');
    const images = main.querySelectorAll('img');
    const topButton = main.querySelector('.top a');
    const bottomButton = main.querySelector('.bottom a');
    const bottomArticles = main.querySelectorAll('.bottom .bottom-article');

    let centered = true;

    this.addEventListener('orientationchange', () => {
        if (!centered) {
            centered = true;
            onOrientationChange(handle, topLayer);

            if (rightArrow.style.opacity === '0') {
                styleArrow(rightArrow, 1, 5);
                bottomButton.classList.remove('hidden');
            } else {
                styleArrow(leftArrow, 1, 5);
                topButton.classList.remove('hidden');
                bottomArticles.forEach(article => article.classList.add('hidden'));
            }
        }
    });

    images.forEach((image) => {
        image.addEventListener('mouseenter', () => {
            if (!centered) { image.classList.add('large'); }
        });

        image.addEventListener('mouseleave', () => {
            if (!centered) { image.classList.remove('large'); }
        });
    });

    [galleryImage, shoppingCartImage].forEach((image) => {
        image.addEventListener('touchstart', onImageClick.bind(null, image));
        image.addEventListener('click', onImageClick.bind(null, image));
    });

    rightArrow.addEventListener('click', () => {
        if (this.event.detail === 1 && centered) {
            styleHandleAndTopLayer(handle, topLayer, 105);
            styleArrow(rightArrow, 0, 0);

            bottomButton.classList.add('hidden');
            centered = false;
        } else if (this.event.detail === 1) {
            styleHandleAndTopLayer(handle, topLayer, 50);
            styleArrow(leftArrow, 1, 5);

            topButton.classList.remove('hidden');
            bottomArticles.forEach(article => article.classList.add('hidden'));
            centered = true;
        }
    });

    leftArrow.addEventListener('click', () => {
        if (this.event.detail === 1 && centered) {
            styleHandleAndTopLayer(handle, topLayer, -5);
            styleArrow(leftArrow, 0, 0);

            topButton.classList.add('hidden');
            bottomArticles.forEach(article => article.classList.remove('hidden'));
            centered = false;
        } else if (this.event.detail) {
            styleHandleAndTopLayer(handle, topLayer, 50);
            styleArrow(rightArrow, 1, 5);

            bottomButton.classList.remove('hidden');
            centered = true;
        }
    });
});

const onOrientationChange = (handle, topLayer) => {
    styleHandleAndTopLayer(handle, topLayer, 50);
};

const onImageClick = (image) => {
    if (this.innerWidth <= 560) {
        window.location = image.classList.contains('fa-shopping-cart') ? '/order.html' : '/gallery.html';
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
