function showMessage () {
    const successMessage = document.querySelector('#alert-success');
    const messageClone = successMessage.content.cloneNode(true);
    document.body.appendChild(messageClone);

    setTimeout(() => {
        const messageClone = document.querySelector('#alert-message');
        messageClone.remove();
    }, 2000);
};

function errorMessage () {
    const errorMessage = document.querySelector('#alert-fail');
    const messageClone = errorMessage.content.cloneNode(true);
    document.body.appendChild(messageClone);

    setTimeout(() => {
        const messageClone = document.querySelector('#alert-message');
        messageClone.remove();
    }, 2000);
}