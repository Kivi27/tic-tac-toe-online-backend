import { RoomEntity } from './room.entity';
import { RoomDto } from '../dtos/room.dto';
import { v4 as uuidv4 } from 'uuid';

export class RoomRepository {
    private readonly rooms: RoomEntity[];

    constructor() {
        const roomsDto: RoomDto[] = [
            { id: uuidv4(), name: 'room 1', players: [], maxCountPlayer: 2 },
            { id: uuidv4(), name: 'room 2', players: [], maxCountPlayer: 2 },
            { id: uuidv4(), name: 'room 3', players: [], maxCountPlayer: 2 },
        ];

        this.rooms = roomsDto.map((roomDto: RoomDto) => RoomEntity.fromDto(roomDto));
    }

    public getRooms(): RoomEntity[] {
        return this.rooms;
    }

    public getRoomById(roomId: string): RoomEntity | undefined {
        return this.rooms.find((room: RoomEntity) => room.id === roomId);
    }

    public getRoomsByPlayerId(playerId: string): RoomEntity[] {
        const rooms: RoomEntity[] = [];

        this.rooms.forEach((room: RoomEntity) => {
            if (room.hasPlayer(playerId)) {
                rooms.push(room);
            }
        });

        return rooms;
    }

}