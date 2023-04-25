import { RoomRepository } from './room.repository';
import { RoomDto } from '../Dtos/room.dto';
import { RoomEntity } from './room.entity';
import { JoinRoomDto } from '../Dtos/joinRoom.dto';
import { PlayerRepository } from '../player/player.repository';
import { PlayerEntity } from '../player/player.entity';
import { PlayerDto } from '../Dtos/player.dto';

export class RoomService {
    private roomRepository: RoomRepository;
    private playerRepository: PlayerRepository;

    constructor(
        roomRepository: RoomRepository,
        playerRepository: PlayerRepository,
    ) {
        this.roomRepository = roomRepository;
        this.playerRepository = playerRepository;
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