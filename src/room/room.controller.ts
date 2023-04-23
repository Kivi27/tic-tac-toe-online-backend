import { RoomModel } from './room.model';
import { JoinRoomDto } from '../Dtos/joinRoomDto.dto';
import { RoomDto } from '../Dtos/room.dto';

export class RoomController {
    public rooms: RoomModel[];
    public defaultCountRoom = 3;

    constructor() {
        this.rooms = [];
    }

    public getRooms(): RoomDto[] {
        return this.rooms.map((room: RoomModel) => RoomModel.toDto(room));
    }

    public joinPlayer(joinRoomDto: JoinRoomDto): void {

    }
}