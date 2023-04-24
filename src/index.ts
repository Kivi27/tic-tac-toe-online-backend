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
const socketClient = new Map<string, string>;
const roomController = new RoomController();
const playerController = new PlayerController();

io.on('connection', (socket) => {
    console.log(`connect new socket: ${socket.id}`);

    const player = playerController.create();
    socketClient.set(socket.id, player.id);

    socket.emit('getPlayer', player);
    socket.emit('updateRooms', roomController.getRooms());

    socket.on('joinPlayer', (joinRoomDto: JoinRoomDto) => {
        roomController.joinPlayer(joinRoomDto);
        io.emit('updateRooms', roomController.getRooms());
    });

    socket.on('disconnect', () => {
        const leavePlayerId = socketClient.get(socket.id);

        if (!leavePlayerId) return;

        const leavePlayer = playerController.getById(leavePlayerId);

        if (leavePlayer) {
            roomController.leavePlayer(leavePlayer);
            io.emit('updateRooms', roomController.getRooms());
        }
    });

});

httpServer.listen(port, () => {
    console.log('Socket server is begin work...');
});