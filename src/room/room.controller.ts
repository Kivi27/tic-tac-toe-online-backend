import { RoomModel } from './room.model';

export class RoomController {
    public rooms: RoomModel[];
    public defaultCountRoom = 3;

    constructor() {
        this.rooms = [];

        for (let i = 0; i < this.defaultCountRoom; i++) {
            this.rooms.push(new RoomModel(`room ${i}`));
        }
    }

    public getRooms(): RoomModel[] {
        return this.rooms;
    }

}