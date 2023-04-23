import { createServer } from 'http';
import { Server } from 'socket.io';
const express = require('express');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = 3000;

io.on('connection', (socket) => {
    console.log(`a new socket: ${socket.id}`);
});

httpServer.listen(port, () => {
    console.log('Socket server is begin work...');
});