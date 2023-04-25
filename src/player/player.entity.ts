import { PlayerDto } from '../Dtos/player.dto';

export class PlayerEntity {
    public id: string;
    public symbol: string;

    constructor() {
        this.id = '';
        this.symbol = '';
    }

    public static toDto(player: PlayerEntity): PlayerDto {
        return  {
            id: player.id,
            symbol: player.symbol,
        }
    }

    public static fromDto(playerDto: PlayerDto): PlayerEntity {
        const player = new PlayerEntity();
        player.id = playerDto.id;
        player.symbol = playerDto.symbol;

        return player;
    }
}