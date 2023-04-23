import { createServer } from 'http';
import { Server } from 'socket.io';
import { RoomController } from './room/room.controller';
const express = require('express');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:63342"]
    }
});

const port = 3000;
const roomController = new RoomController();

io.on('connection', (socket) => {
    console.log(`connect new socket: ${socket.id}`);
    socket.emit('updateRooms', roomController.getRooms());
});

httpServer.listen(port, () => {
    console.log('Socket server is begin work...');
});