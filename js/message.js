/**
 * Show a message to the user
 * 
 * Credits to https://stackoverflow.com/a/29017547/11521228 for the fadeOut approach without using JQuery
 * 
 * @param {string} text - The content of the message
 * @param {'error' | 'success' | 'info'} className - The kind of message
 */
function showMessage(text, className) {
    let messagesContainer = document.querySelector("#messages_container");
    if (!messagesContainer) {
        messagesContainer = document.body.appendChild(createMessageContainer());
    }
    
    let message = createMessage(className, text);
    messagesContainer.prepend(message);
    setTimeout(() => {
        message.style.opacity = 0;
    }, 5000);
    message.addEventListener('transitionend', () => message.remove());
}

function createMessage(className, text) {
    let html = `<div class='message ${className}_message'>${text}</div>`;
    return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}

function createMessageContainer() {
    let html = `<div id='messages_container'></div>`;
    return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}

export { showMessage };