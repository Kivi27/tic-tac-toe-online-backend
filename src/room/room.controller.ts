import { RoomModel } from './room.model';
import { JoinRoomDto } from '../Dtos/joinRoomDto.dto';
import { RoomDto } from '../Dtos/room.dto';
import { v4 as uuidv4 } from 'uuid';

export class RoomController {
    public rooms: RoomModel[];

    constructor() {
        const roomsDto: RoomDto[] = [
            { id: uuidv4(), name: 'room 1', players: [], maxCountPlayer: 2 },
            { id: uuidv4(), name: 'room 2', players: [], maxCountPlayer: 2 },
            { id: uuidv4(), name: 'room 3', players: [], maxCountPlayer: 2 },
        ];

        this.rooms = roomsDto.map((roomDto: RoomDto) => RoomModel.fromDto(roomDto));
    }

    public getRooms(): RoomDto[] {
        return this.rooms.map((room: RoomModel) => RoomModel.toDto(room));
    }

    public joinPlayer(joinRoomDto: JoinRoomDto): void {
        this.rooms.forEach((room: RoomModel) => room.leave(joinRoomDto.player));

        const foundedRoom = this.rooms.find((room: RoomModel) => room.getId() === joinRoomDto.room.id);

        if (foundedRoom !== undefined) {
            foundedRoom.join(joinRoomDto.player);
        }
    }
}