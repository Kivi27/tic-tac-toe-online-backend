import { PlayerDto } from '../Dtos/player.dto';

export class PlayerModel {
    private id: string;
    private symbol: string;

    constructor() {
        this.id = '';
        this.symbol = '';
    }

    public getSymbol(): string {
        return this.symbol;
    }

    public getId(): string {
        return this.id;
    }


    public static toDto(player: PlayerModel): PlayerDto {
        return  {
            id: player.id,
            symbol: player.symbol,
        }
    }

    public static fromDto(playerDto: PlayerDto): PlayerModel {
        const player = new PlayerModel();
        player.id = playerDto.id;
        player.symbol = playerDto.symbol;

        return player;
    }
}