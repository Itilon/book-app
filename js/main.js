document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const topLayer = main.querySelector('.top');
    const handle = main.querySelector('.handle');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const images = main.querySelectorAll('img');
    const topButton = main.querySelector('.top a');
    const bottomButton = main.querySelector('.bottom a');
    // const countdown = main.querySelector('.countdown');
    // const daysContainer = countdown.querySelector('.days');
    // const hoursContainer = countdown.querySelector('.hours');
    // const minutesContainer = countdown.querySelector('.minutes');
    // const secondsContainer = countdown.querySelector('.seconds');

    let centered = true;

    images.forEach(image => {
        image.addEventListener('mouseenter', () => {
            if (!centered) {
                image.classList.add('large');
            }
        });

        image.addEventListener('mouseleave', () => {
            if (!centered) {
                image.classList.remove('large');
            }
        });
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

    // const launchDate = new Date('Dec 1, 2020 00:00:00').getTime();

    // const interval = setInterval(() => {
    //     const now = new Date().getTime();
    //     const distance = launchDate - now;

    //     const days = `${Math.floor(distance / (1000 * 60 * 60 * 24))} дни`;
    //     const hours = `${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} часа`;
    //     const mins = `${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))} минути`;
    //     const seconds = `${Math.floor((distance % (1000 * 60)) / 1000)} секунди`;

    //     daysContainer.innerHTML = days;
    //     hoursContainer.innerHTML = hours;
    //     minutesContainer.innerHTML = mins;
    //     secondsContainer.innerHTML = seconds;

    //     if (distance < 0) {
    //         clearInterval(interval);
    //     }
    // }, 1000);
});

const styleHandleAndTopLayer = (handle, topLayer, value) => {
    handle.style.left = value + '%';
    topLayer.style.width = `calc(${value}vw + 1000px)`;
};


const styleArrow = (arrow, opacity, zIndex) => {
    arrow.style.opacity = opacity;
    arrow.style.zIndex = zIndex;
};