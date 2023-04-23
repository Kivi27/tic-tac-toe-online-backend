import { PlayerModel } from '../player/player.model';
import { JoinRoomDto } from '../Dtos/joinRoomDto.dto';
import { RoomDto } from '../Dtos/room.dto';

export class RoomModel {
    private id: string;
    private name: string;
    private players: PlayerModel[];
    private MAX_COUNT_PLAYER = 2;

    constructor() {
        this.id = '';
        this.name = '';
        this.players = [];
    }

    public getId(): string {
        return this.id;
    }

    public joinPlayer(joinRoomDto: JoinRoomDto): void {

    }

    public leavePlayer(playerId: string): void {
        this.players = this.players.filter((player: PlayerModel) => player.getId() !== playerId);
    }

    public static toDto(room: RoomModel): RoomDto {
        return  {
            id: room.id,
            name: room.name,
            players: room.players.map((player) => PlayerModel.toDto(player)),
            MAX_COUNT_PLAYER: room.MAX_COUNT_PLAYER,
        }
    }

    public static fromDto(roomDto: RoomDto): RoomModel {
        const room = new RoomModel();
        room.id = roomDto.id;
        room.name = roomDto.name;
        room.players = roomDto.players.map((playerDto) => PlayerModel.fromDto(playerDto));
        room.MAX_COUNT_PLAYER = roomDto.MAX_COUNT_PLAYER;

        return room;
    }
}