import { PlayerRepository } from './player.repository';
import { PlayerDto } from '../Dtos/player.dto';
import { PlayerEntity } from './player.entity';

export class PlayerService {
    private playerRepository: PlayerRepository;

    constructor(playerRepository: PlayerRepository) {
        this.playerRepository = playerRepository;
    }

    public create(): PlayerDto {
        const player = this.playerRepository.create();

        return PlayerEntity.toDto(player);
    }

    public getById(playerId: string): PlayerDto | undefined {
        const player = this.playerRepository.getById(playerId);

        return player
            ? PlayerEntity.toDto(player)
            : undefined;
    }
}