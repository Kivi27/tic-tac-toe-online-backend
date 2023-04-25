import { RoomDto } from './room.dto';
import { PlayerDto } from './player.dto';

export type JoinRoomDto = {
    room: RoomDto;
    player: PlayerDto;
}