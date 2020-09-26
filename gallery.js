document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');

    const imageContainers = Array.from(main.querySelectorAll('.gallery-item-container'));

    rightArrow.addEventListener('click', rightSlide.bind(null, imageContainers));
    leftArrow.addEventListener('click', leftSlide.bind(null, imageContainers));
});

const rightSlide = (imageContainers) => {
    let visibleImageChanged = false;

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
};

const leftSlide = (imageContainers) => {
    let visibleImageChanged = false;

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
};