import { PlayerEntity } from './player.entity';
import { PlayerDto } from '../Dtos/player.dto';
import { v4 as uuidv4 } from 'uuid';

export class PlayerRepository {
    private players: PlayerEntity[];

    constructor() {
        this.players = [];
    }

    public create(): PlayerEntity {
        const playerDto: PlayerDto = {
            id: uuidv4(),
            symbol: 'X',
        }

        const player = PlayerEntity.fromDto(playerDto);
        this.players.push(player);

        return player;
    }

    public getById(playerId: string): PlayerEntity | undefined {
        return  this.players.find((player: PlayerEntity) => playerId == player.id);
    }
}