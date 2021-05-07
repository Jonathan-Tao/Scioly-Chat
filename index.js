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

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});

	console.log('a user connected');
	io.emit('chat message', 'a user connected');
	io.emit('chat message', 'please enter a nickname with the !nick command');

	socket.on('disconnect', () => {
		io.emit('chat message', 'a user disconnected');
		console.log('a user disconnected');
	});

});

server.listen(3000, () => {
	console.log('listening on *:3000');
});