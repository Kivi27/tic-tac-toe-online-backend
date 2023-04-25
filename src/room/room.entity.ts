import { PlayerEntity } from '../player/player.entity';
import { RoomDto } from '../Dtos/room.dto';
import { PlayerDto } from '../Dtos/player.dto';

export class RoomEntity {
    public id: string;
    public name: string;
    public players: PlayerEntity[];
    public maxCountPlayer = 2;

    constructor() {
        this.id = '';
        this.name = '';
        this.players = [];
    }

    public hasPlayer(playerId: string): boolean {
        const foundedPlayer = this.players.find((player: PlayerEntity) => player.id === playerId);

        return Boolean(foundedPlayer);
    }

    public static toDto(room: RoomEntity): RoomDto {
        return  {
            id: room.id,
            name: room.name,
            players: room.players.map((player: PlayerEntity) => PlayerEntity.toDto(player)),
            maxCountPlayer: room.maxCountPlayer,
        }
    }

    public static fromDto(roomDto: RoomDto): RoomEntity {
        const room = new RoomEntity();
        room.id = roomDto.id;
        room.name = roomDto.name;
        room.players = roomDto.players.map((playerDto: PlayerDto) => PlayerEntity.fromDto(playerDto));
        room.maxCountPlayer = roomDto.maxCountPlayer;

        return room;
    }
}