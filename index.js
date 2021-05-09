const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	// when a message is sent this code is executed
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);

		switch (msg) {
		case '!nick':
			break;
		default:
			break;
		}

		io.emit('chat message', msg);
	});
	console.log('a user connected');

	// detects when a user disconnects
	socket.on('disconnect', () => {
		io.emit('chat message', 'a user disconnected');
		console.log('a user disconnected');
	});

	// what is sent when a user joins
	io.emit('chat message', 'a user connected');
});

// defines which port it's listening on
server.listen(3000, () => {
	console.log('listening on *:3000');
});