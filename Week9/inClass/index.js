//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let messages = [];
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);

    // socket.name = data.name;
    // socket.roomname = data.room;

    // socket.join(socket.roomname)

    let data = { oldMessages: messages };
    socket.to(socket.roomname).emit('pastMessages', data);
    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");
    })
    socket.on('chatMessage', (data) => {
        messages.push(data);
        console.log(messages);
        io.socket.to(socket.roomname).emit('chatMessage', data);

    })

})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});



/*//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let messages = [];
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    let data = { oldMessages: messages };
    socket.emit('pastMessages', data);
    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");
    })
    socket.on('chatMessage', (data) => {
        messages.push(data);
        console.log(messages);
        io.sockets.emit('chatMessage', data);
    })
    socket.on('userTyping', () => {
        io.sockets.emit('userTyping'); //broadcast so everyone sees instead
    })

})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});*/