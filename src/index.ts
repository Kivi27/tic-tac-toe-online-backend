import { createServer } from 'http';
import { Server } from 'socket.io';
import { JoinRoomDto } from './Dtos/joinRoomDto.dto';
import { PlayerService } from './player/player.service';
import { RoomService } from './room/room.service';
import { RoomRepository } from './room/room.repository';
import { PlayerRepository } from './player/player.repository';
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

const roomRepository = new RoomRepository();
const playerRepository = new PlayerRepository();

const playerController = new PlayerService(playerRepository);
const roomController = new RoomService(roomRepository, playerRepository);

io.on('connection', (socket) => {
    console.log(`connect new socket: ${socket.id}`);

    const player = playerController.create();
    socketClient.set(socket.id, player.id);

    socket.emit('getPlayer', player);
    socket.emit('updateRooms', roomController.getRooms());

    socket.on('joinPlayer', (joinRoomDto: JoinRoomDto) => {
        roomController.leavePlayerWithAllRoom(joinRoomDto.player.id);
        roomController.joinPlayer(joinRoomDto);
        io.emit('updateRooms', roomController.getRooms());
    });

    socket.on('disconnect', () => {
        const leavePlayerId = socketClient.get(socket.id);

        if (!leavePlayerId) return;

        roomController.leavePlayerWithAllRoom(leavePlayerId);
        io.emit('updateRooms', roomController.getRooms());
    });
});

httpServer.listen(port, () => {
    console.log('Socket server is begin work...');
});