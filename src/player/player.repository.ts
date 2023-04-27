import { PlayerEntity } from './player.entity';
import { PlayerDto } from '../dtos/player.dto';
import { v4 as uuidv4 } from 'uuid';

export class PlayerRepository {
    private players: PlayerEntity[];

    constructor() {
        this.players = [];
    }

    public create(): PlayerEntity {
        const playerDto: PlayerDto = {
            id: uuidv4(),
            symbol: '-',
        }

        const player = PlayerEntity.fromDto(playerDto);
        this.players.push(player);

        return player;
    }

    public getById(playerId: string): PlayerEntity | undefined {
        return this.players.find((player: PlayerEntity) => playerId == player.id);
    }

    public updatePlayerSymbol(playerId: string, playerSymbol: string): void {
        const player = this.getById(playerId);

        if (player) {
            player.symbol = playerSymbol;
        }
    }
}