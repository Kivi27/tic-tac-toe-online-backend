import { RoomRepository } from './room.repository';
import { RoomDto } from '../dtos/room.dto';
import { RoomEntity } from './room.entity';
import { JoinRoomDto } from '../dtos/join-room.dto';
import { PlayerRepository } from '../player/player.repository';
import { PlayerEntity } from '../player/player.entity';
import { PlayerDto } from '../dtos/player.dto';
import { TicTacToeDto } from '../dtos/tic-tac-toe.dto';
import { TicTacToeEntity } from '../tic-tac-toe/tic-tac-toe.entity';
import { TicTacToeRepository } from '../tic-tac-toe/tic-tac-toe.repository';

export class RoomService {
    private readonly roomRepository: RoomRepository;
    private readonly playerRepository: PlayerRepository;
    private readonly ticTacToeRepository: TicTacToeRepository;

    constructor(
        roomRepository: RoomRepository,
        playerRepository: PlayerRepository,
        ticTacToeRepository: TicTacToeRepository,
    ) {
        this.roomRepository = roomRepository;
        this.playerRepository = playerRepository;
        this.ticTacToeRepository = ticTacToeRepository;
    }

    public attachTicTacToe(roomId: string, ticTacToeDto: TicTacToeDto): void {
        const room = this.roomRepository.getRoomById(roomId);

        if (room) {
            this.playerRepository.updatePlayerSymbol(room.players[0].id, 'X');
            this.playerRepository.updatePlayerSymbol(room.players[1].id, 'O');
            room.ticTacToe = TicTacToeEntity.FromDto(ticTacToeDto);
        }
    }

    public detachTicTacToe(roomId: string): void {
        const room = this.roomRepository.getRoomById(roomId);

        if (room && room.ticTacToe) {
            this.ticTacToeRepository.delete(room.ticTacToe.id);
            room.ticTacToe = null;
        }
    }

    public getRooms(): RoomDto[] {
        const rooms = this.roomRepository.getRooms();

        return rooms.map((room: RoomEntity) => RoomEntity.toDto(room));
    }

    public getRoomById(roomId: string): RoomDto | undefined {
        const room = this.roomRepository.getRoomById(roomId);

        return room
            ? RoomEntity.toDto(room)
            : undefined;
    }

    public getRoomByPlayerId(playerId: string): RoomDto | undefined {
        const room = this.roomRepository.getRoomByPlayerId(playerId);

        return room
            ? RoomEntity.toDto(room)
            : undefined;
    }

    public joinPlayer(joinRoomDto: JoinRoomDto): void {
        const player = this.playerRepository.getById(joinRoomDto.player.id);
        const room = this.roomRepository.getRoomById(joinRoomDto.room.id);

        if (room && player) {
            if (this.isRoomFull(room.id)) return;

            room.players.push(player);
        }
    }

    public isJoinPlayer(room: RoomDto, player: PlayerDto) {
        const foundedPlayer = this.playerRepository.getById(player.id);
        const foundedRoom = this.roomRepository.getRoomById(room.id);

        if (foundedPlayer && foundedRoom) {
            return foundedRoom.hasPlayer(foundedPlayer.id);
        }

        return false;
    }

    public leavePlayerWithAllRoom(playerId: string): RoomDto[] {
        const player = this.playerRepository.getById(playerId);
        const rooms = this.roomRepository.getRoomsByPlayerId(playerId);

        if (player && rooms) {
            rooms.forEach((room: RoomEntity) => {
                room.players = room.players.filter((player: PlayerEntity) => player.id !== playerId);
            });
        }

        return rooms.map((room: RoomEntity) => RoomEntity.toDto(room));
    }

    public isRoomFull(roomId: string): boolean {
        const room = this.roomRepository.getRoomById(roomId);

        if (room) {
            return room.players.length >= room.maxCountPlayer;
        }

        return false;
    }
}