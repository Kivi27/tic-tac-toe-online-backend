import { PlayerModel } from '../player/player.model';
import { v4 as uuidv4 } from 'uuid';

export class RoomModel {
    private readonly id: string;
    private readonly name: string;
    private players: PlayerModel[];
    private readonly MAX_COUNT_PLAYER = 2;

    constructor() {
        this.id = uuidv4();
        this.name = `room ${this.id}`
        this.players = [];
    }

    public joinPlayer(player: PlayerModel): void {
        if (this.players.length >= this.MAX_COUNT_PLAYER) return;

        this.players.push(player);
    }

    public leavePlayer(playerId: string): void {
        this.players = this.players.filter((player: PlayerModel) => player.getId() !== playerId);
    }
}