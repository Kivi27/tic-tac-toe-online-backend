import { PlayerModel } from '../player/player.model';
import { RoomDto } from '../Dtos/room.dto';
import { PlayerDto } from '../Dtos/player.dto';

export class RoomModel {
    private id: string;
    private name: string;
    private players: PlayerModel[];
    private maxCountPlayer = 2;

    constructor() {
        this.id = '';
        this.name = '';
        this.players = [];
    }

    public getId(): string {
        return this.id;
    }

    public join(player: PlayerDto): void {
        if (this.players.length >= this.maxCountPlayer) return;

        const playerFromDto = PlayerModel.fromDto(player);
        this.players.push(playerFromDto);
    }

    public leave(leavePlayer: PlayerDto): void {
        this.players = this.players.filter((player: PlayerModel) => player.getId() !== leavePlayer.id);
    }

    public static toDto(room: RoomModel): RoomDto {
        return  {
            id: room.id,
            name: room.name,
            players: room.players.map((player: PlayerModel) => PlayerModel.toDto(player)),
            maxCountPlayer: room.maxCountPlayer,
        }
    }

    public static fromDto(roomDto: RoomDto): RoomModel {
        const room = new RoomModel();
        room.id = roomDto.id;
        room.name = roomDto.name;
        room.players = roomDto.players.map((playerDto: PlayerDto) => PlayerModel.fromDto(playerDto));
        room.maxCountPlayer = roomDto.maxCountPlayer;

        return room;
    }
}