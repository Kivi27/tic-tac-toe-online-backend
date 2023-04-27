import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/join-room.dto';
import { PlayerService } from './player/player.service';
import { RoomService } from './room/room.service';
import { RoomRepository } from './room/room.repository';
import { PlayerRepository } from './player/player.repository';
import { RoomDto } from './dtos/room.dto';
import { TicTacToeDto } from './dtos/tic-tac-toe.dto';
import { TicTacToeRepository } from './tic-tac-toe/tic-tac-toe.repository';
import { TicTacToeService } from './tic-tac-toe/tic-tac-toe.service';
import { ClickCellDto } from './dtos/click-cell.dto';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
const express = require('express');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["https://tic-tac-toe-online-frontend.onrender.com:3000"]
    }
});

const port = 3000;
const socketClient = new Map<string, string>;

const roomRepository = new RoomRepository();
const playerRepository = new PlayerRepository();
const ticTacToeRepository = new TicTacToeRepository();

const playerService = new PlayerService(playerRepository);
const roomService = new RoomService(roomRepository, playerRepository, ticTacToeRepository);
const ticTacToeService = new TicTacToeService(ticTacToeRepository, playerRepository);

io.on('connection', (socket) => {

    const player = playerService.create();
    socketClient.set(socket.id, player.id);

    socket.emit('getPlayer', player);
    socket.emit('updateRooms', roomService.getRooms());

    socket.on('joinPlayer', (joinRoomDto: JoinRoomDto) => {
        socketClean(socket, joinRoomDto.player.id);
        roomService.joinPlayer(joinRoomDto);

        if (roomService.isJoinPlayer(joinRoomDto.room, joinRoomDto.player)) {
            socket.join(joinRoomDto.room.id);

            if (roomService.isRoomFull(joinRoomDto.room.id)) {
                const ticTacToe: TicTacToeDto = ticTacToeService.create();
                roomService.attachTicTacToe(joinRoomDto.room.id, ticTacToe);

                io.to(joinRoomDto.room.id).emit('createOrUpdateTicTacToe', ticTacToe);
            }
        }

        io.emit('updateRooms', roomService.getRooms());
        socket.emit('getCurrentRoom', joinRoomDto.room.id);
    });

    socket.on('clickCell', (clickCell: ClickCellDto) => {
        const ticTacToeDto = ticTacToeService.step(
            clickCell.ticTacToeId,
            clickCell.playerId,
            clickCell.selectRow,
            clickCell.selectColumn
        );

        io.to(clickCell.roomId).emit('createOrUpdateTicTacToe', ticTacToeDto);

        const isWin = ticTacToeService.isWin(clickCell.ticTacToeId, clickCell.playerId);

        if (isWin) {
            io.to(clickCell.roomId).emit('winner', playerService.getById(clickCell.playerId));
        }
    });

    socket.on('disconnect', () => {
        const leavePlayerId = socketClient.get(socket.id);

        if (leavePlayerId) {
            const leaveRoom = roomService.getRoomByPlayerId(leavePlayerId);

            if (leaveRoom && roomService.isRoomFull(leaveRoom.id)) {
                roomService.detachTicTacToe(leaveRoom.id);
                io.to(leaveRoom.id).emit('playerExitLobby');
            }

            socketClean(socket, leavePlayerId);
            io.emit('updateRooms', roomService.getRooms());
            socketClient.delete(socket.id);
        }
    });
});

function socketClean(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    playerId: string
) {
    const rooms = roomService.leavePlayerWithAllRoom(playerId);

    rooms.forEach((room: RoomDto) =>  socket.leave(room.id));
}

httpServer.listen(port, () => {
    console.log(`Server is begin work... Port: ${port}`);
});