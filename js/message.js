/**
 * Show a message to the user
 * 
 * @param {string} text - The content of the message
 * @param {'error' | 'success' | 'info'} className - The kind of message
 */
function showMessage(text, className) {
    if (!document.querySelector("#messages_container")) {
        $("body").append($(`<div id='messages_container'></div>`))
    }
    let $message = $(`<div class='message ${className}_message'>${text}</div>`);
    $("#messages_container").append($message);
    $message.show().delay(5000).fadeOut(() => {
        $(this).remove();
    });
}

export { showMessage };