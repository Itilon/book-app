// const countdown = document.querySelector('.countdown');

// const launchDate = new Date('Dec 1, 2020 00:00:00').getTime();

// const interval = setInterval(() => {
//   const now = new Date().getTime();
//   const distance = launchDate - now;

//   const days = `${Math.floor(distance / (1000 * 60 * 60 * 24))} дни`;
//   const hours = `${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} часа`;
//   const mins = `${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))} минути`;
//   const seconds = `${Math.floor((distance % (1000 * 60)) / 1000)} секунди`;

//   countdown.innerHTML = `<div>${days}</div><div>${hours}</div><div>${mins}</div><div>${seconds}</div>`;

//   if (distance < 0) {
//     clearInterval(interval);
//     countdown.style.color = '#17a2b8';
//     countdown.innerHTML = 'Launched!';
//   }
// }, 1000);

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const topLayer = main.querySelector('.top');
    const handle = main.querySelector('.handle');
    const rightArrow = main.querySelector('.fa-arrow-circle-right');
    const leftArrow = main.querySelector('.fa-arrow-circle-left');
    const bottomArticles = main.querySelectorAll('.bottom-article');
    const countdown = main.querySelector('.countdown');
    const daysContainer = countdown.querySelector('.days');
    const hoursContainer = countdown.querySelector('.hours');
    const minutesContainer = countdown.querySelector('.minutes');
    const secondsContainer = countdown.querySelector('.seconds');

    // const images = main.querySelectorAll('img');
    // const topIcons = main.querySelectorAll('.top-icon');
    // const bottomIcons = main.querySelectorAll('.bottom-icon');

    let centered = true;

    rightArrow.addEventListener('click', (event) => {
        if (centered) {
            handle.style.left = 105 + '%';
            topLayer.style.width = `calc(105vw + 1000px)`;
            centered = false;
            rightArrow.style.opacity = 0;
            rightArrow.style.zIndex = 0;
        } else {
            handle.style.left = 50 + '%';
            topLayer.style.width = `calc(50vw + 1000px)`;
            centered = true;
            leftArrow.style.opacity = 1;
            leftArrow.style.zIndex = 5;
            bottomArticles.forEach(article => article.classList.add('hidden'));
            countdown.classList.remove('hidden');
        }
    });

    leftArrow.addEventListener('click', (event) => {
        if (centered) {
            handle.style.left = -5 + '%';
            topLayer.style.width = `calc(-5vw + 1000px)`;
            centered = false;
            leftArrow.style.opacity = 0;
            leftArrow.style.zIndex = 0;
            bottomArticles.forEach(article => article.classList.remove('hidden'));
            countdown.classList.add('hidden');
        } else {
            handle.style.left = 50 + '%';
            topLayer.style.width = `calc(50vw + 1000px)`;
            centered = true;
            rightArrow.style.opacity = 1;
            rightArrow.style.zIndex = 5;
        }
    });

    const launchDate = new Date('Dec 1, 2020 00:00:00').getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = `${Math.floor(distance / (1000 * 60 * 60 * 24))} дни`;
        const hours = `${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} часа`;
        const mins = `${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))} минути`;
        const seconds = `${Math.floor((distance % (1000 * 60)) / 1000)} секунди`;

        daysContainer.innerHTML = days;
        hoursContainer.innerHTML = hours;
        minutesContainer.innerHTML = mins;
        secondsContainer.innerHTML = seconds;

        if (distance < 0) {
            clearInterval(interval);
        }
    }, 1000);

    // images.forEach(image => {
    //     image.addEventListener('mouseenter', () => {
    //         if (image.classList[0] === 'top-image') {
    //             topIcons.forEach(icon => icon.classList.remove('hidden'));
    //         } else {
    //             bottomIcons.forEach(icon => icon.classList.remove('hidden'));
    //         }
    //     });

    //     image.addEventListener('mouseleave', (event) => {
    //         if (image.classList[0] === 'top-image'
    //             && !event.relatedTarget.classList.contains('top-icon')) {
    //             topIcons.forEach(icon => icon.classList.add('hidden'));
    //         } else if (image.classList[0] === 'bottom-image'
    //             && !event.relatedTarget.classList.contains('bottom-icon')) {
    //             bottomIcons.forEach(icon => icon.classList.add('hidden'));
    //         }
    //     });
    // });
});