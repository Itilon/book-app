document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main');
    const form = main.querySelector('form');
    const inputs = main.querySelectorAll('input');
    const textarea = main.querySelector('textarea');

    form.addEventListener('submit', validateForm.bind(null, form));

    inputs.forEach(input => {
        input.addEventListener('keydown', checkForErrorMessage.bind(null, input));
        input.addEventListener('focusout', styleElementLabel.bind(null, input));
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
    element.parentElement.appendChild(errorMessageContainer);

    setTimeout(() => errorMessageContainer.classList.add('show'), 0);

    exitBtn.addEventListener('click', () => removeElement(errorMessageContainer));
};

const checkForErrorMessage = (input) => {
    if (input.validity.valid && [...input.parentElement.children].find((child) => child.classList.contains('error-message'))) {
        removeElement([...input.parentElement.children].find((child) => child.classList.contains('error-message')));
    }
};

const resizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};

const styleElementLabel = (element) => {
    if (element.value && element.type !== 'checkbox') {
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