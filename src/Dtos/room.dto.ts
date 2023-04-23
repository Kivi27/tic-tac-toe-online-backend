import { PlayerDto } from './player.dto';

export type RoomDto = {
     id: string;
     name: string;
     players: PlayerDto[];
     MAX_COUNT_PLAYER: number;
}