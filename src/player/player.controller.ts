import { PlayerDto } from '../Dtos/player.dto';
import { v4 as uuidv4 } from 'uuid';
import { PlayerModel } from './player.model';

export class PlayerController {
    private players: PlayerModel[];

    constructor() {
        this.players = [];
    }

    public create(): PlayerDto {
        const playerDto: PlayerDto = {
            id: uuidv4(),
            symbol: 'X',
        }
        this.players.push(PlayerModel.fromDto(playerDto));

        return playerDto;
    }

    public getById(playerId: string): PlayerDto | undefined {
        const foundedPlayer = this.players.find((player: PlayerModel) => playerId == player.getId());

        return foundedPlayer
            ? PlayerModel.toDto(foundedPlayer)
            : undefined;
    }
}