import { PlayerDto } from '../Dtos/player.dto';
import { v4 as uuidv4 } from 'uuid';

export class PlayerController {
    constructor() {
    }

    public create(): PlayerDto {
        return {
            id: uuidv4(),
            symbol: 'X',
        }
    }
}