document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const textWrapper = main.querySelector('.text-wrapper');
    const footnoteAnchor = main.querySelector('.footnote-anchor');

    footnoteAnchor.addEventListener('click', navigateToFootnote.bind(null, textWrapper));
});

const navigateToFootnote = (textWrapper) => {
    this.event.preventDefault();

    smoothScroll(textWrapper, 120);
};

const smoothScroll = (textWrapper, step) => {
    if (textWrapper.scrollHeight - textWrapper.scrollTop > step && step > 0) {
        textWrapper.scrollTop += step;
        setTimeout(() => smoothScroll(textWrapper, step - 5), 25);
    }
};
