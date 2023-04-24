import { createServer } from 'http';
import { Server } from 'socket.io';
import { RoomController } from './room/room.controller';
import { PlayerController } from './player/player.controller';
import { JoinRoomDto } from './Dtos/joinRoomDto.dto';
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
const playerController = new PlayerController();

io.on('connection', (socket) => {
    console.log(`connect new socket: ${socket.id}`);
    socket.emit('getPlayer', playerController.create());
    socket.emit('updateRooms', roomController.getRooms());

    socket.on('joinPlayer', (joinRoomDto: JoinRoomDto) => {
        roomController.joinPlayer(joinRoomDto);
        io.emit('updateRooms', roomController.getRooms());
    });
});

httpServer.listen(port, () => {
    console.log('Socket server is begin work...');
});