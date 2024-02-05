// Create a Proxy for the document object
const documentProxy = new Proxy(document, {
    get: function (target, property, receiver) {
        // Intercept the 'querySelector' method
        if (property === 'querySelector') {
            return function (...args) {
                // Call the original 'querySelector' method
                const element = target.querySelector(...args);
                element.classList.toggle('selected');

                return element;
            };
        }

        // For other properties/methods, return the original value
        return Reflect.get(target, property, receiver);
    },
});

function generateToggleAction(listItem, id) {
    listItem.addEventListener('click', () => {
        console.log('CLICKED');
        // Select the element using the proxy
        // it will apply a class to highlight the seleected elment
        documentProxy.querySelector(`#${id}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM READY');
    const body = document.querySelector('body');
    const allBodyElements = body.querySelectorAll('*');
    const controls = document.querySelector('#controls');
    const list = document.createElement('ul');
    controls.append(list);

    allBodyElements.forEach((element) => {
        if (
            element.tagName !== 'SCRIPT' &&
            element.tagName !== 'SPAN' &&
            element.id !== 'controls' &&
            element.id !== 'app'
        ) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `document.querySelector(#${element.id})`;
            listItem.classList.add('code');
            list.appendChild(listItem);
            generateToggleAction(listItem, element.id);
        }
    });
});
