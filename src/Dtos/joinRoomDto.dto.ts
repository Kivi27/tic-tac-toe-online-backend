import { PlayerDto } from './player.dto';

export type JoinRoomDto = {
    roomId: string,
    player: PlayerDto,
}