(function() {
    var socket = io.connect('http://localhost:3000')

    var message = document.querySelector("#message")
    var username = document.querySelector("#username")
    var send_message = document.querySelector("#send_message")
    var send_username = document.querySelector("#send_username")
    var chatroom = document.querySelector("#chatroom")
    var feedback = document.querySelector("#feedback")

    send_message.addEventListener('click', function() {
        socket.emit('new_message', {message: message.value})
    })

    socket.on("new_message", (data) => {
        let node = document.createElement('p')
        node.setAttribute('class', 'message');
        let textNode = document.createTextNode(data.username + ":" + data.message);
        node.appendChild(textNode);
        feedback.innerHTML = '';
        message.value = '';
        chatroom.appendChild(node)
    })

    send_username.addEventListener('click', function() {
        socket.emit('change_username', {username: username.value})
    })

    message.addEventListener("keypress", () => {
        socket.emit('typing', {username : username.value})
    })

    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })
})();