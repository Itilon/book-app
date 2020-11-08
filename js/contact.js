document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const form = main.querySelector('form');
    const inputs = main.querySelectorAll('input');
    const textarea = main.querySelector('textarea');
    const pieceCounter = main.querySelector('.piece-count');
    const priceCounter = main.querySelector('.price');

    form.addEventListener('submit', validateForm.bind(null, form));

    inputs.forEach((input) => {
        if (input.type !== 'checkbox' && input.type !== 'number') {
            input.addEventListener('keydown', checkForErrorMessage.bind(null, input));
            input.addEventListener('focusout', styleElementLabel.bind(null, input));
        } else if (input.type === 'checkbox') {
            input.addEventListener('click', checkForErrorMessage.bind(null, input));
        } else {
            input.addEventListener('keyup', populateCountAndPriceFields.bind(null, input, pieceCounter, priceCounter));
            input.addEventListener('focusout', validateNumberInput.bind(null, input, pieceCounter, priceCounter));
        }
    });

    textarea.addEventListener('keydown', resizeTextarea.bind(null, textarea));
    textarea.addEventListener('focusout', styleElementLabel.bind(null, textarea));
});

const validateForm = (form) => {
    this.event.preventDefault();

    if (form.checkValidity()) {

    } else {
        [...form.elements].forEach((element) => {
            if (!element.validity.valid && ![...element.parentElement.children].find((child) => child.classList.contains('error-message'))) {
                populateErrorMessage(element);
            }
        });
    }
};

const populateErrorMessage = (element) => {
    element.classList.add('invalid');

    const errorMessageContainer = createElement('div', ['error-message'], null);
    const errorIcon = createElement('i', ['fa', 'fa-exclamation-triangle'], null);
    const errorMessage = createElement('p', null, 'Моля, попълни това поле правилно!')
    const exitBtn = createElement('span', ['exit-btn'], '&#10005;');

    errorMessageContainer.appendChild(errorIcon);
    errorMessageContainer.appendChild(errorMessage);
    errorMessageContainer.appendChild(exitBtn);

    if (!element.parentElement.classList.contains('agreement')) {
        element.parentElement.appendChild(errorMessageContainer);
    } else {
        element.parentElement.parentElement.appendChild(errorMessageContainer);
    }

    setTimeout(() => errorMessageContainer.classList.add('show'), 0);

    exitBtn.addEventListener('click', () => removeElement(errorMessageContainer));
};

const checkForErrorMessage = (input) => {
    if (input.type !== 'checkbox' && input.validity.valid && [...input.parentElement.children].find((child) => child.classList.contains('error-message'))) {
        removeElement([...input.parentElement.children].find((child) => child.classList.contains('error-message')));
    } else if (input.validity.valid && [...input.parentElement.parentElement.children].find((child) => child.classList.contains('error-message'))) {
        removeElement([...input.parentElement.parentElement.children].find((child) => child.classList.contains('error-message')));
    }
};

const resizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};

const styleElementLabel = (element) => {
    if (element.value) {
        element.labels[0].classList.add('top-positioned');
    } else if (element.labels[0].classList.contains('top-positioned')) {
        element.labels[0].classList.remove('top-positioned');
    }

    if (element.validity.valid) {
        element.classList.add('valid');

        if (element.classList.contains('invalid')) {
            element.classList.remove('invalid');
        }
    } else {
        element.classList.add('invalid');

        if (element.classList.contains('valid')) {
            element.classList.remove('valid');
        }
    }
};

const createElement = (tagName, classList, innerText) => {
    const element = document.createElement(tagName);
    if (classList) {
        element.classList.add(...classList);
    }
    element.innerHTML = innerText;
    return element;
};

const removeElement = (element) => {
    element.remove();
};

const populateCountAndPriceFields = (input, pieceCounter, priceCounter) => {
    if (input.validity.valid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        pieceCounter.innerText = input.value === '1' ? 'бройка' : 'бройки';
        priceCounter.innerText = `${input.value * 30}`;
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
    }
};

const validateNumberInput = (input, pieceCounter, priceCounter) => {
    if (!input.validity.valid) {
        input.classList.remove('invalid');
        input.value = '1';
        pieceCounter.innerText = 'бройка';
        priceCounter.innerText = '30';
    }
}