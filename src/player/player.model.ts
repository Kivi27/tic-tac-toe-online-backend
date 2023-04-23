import { v4 as uuidv4 } from 'uuid';

export class PlayerModel {
    private readonly id: string;
    private readonly symbol: string;

    constructor(symbol: string) {
        this.id = uuidv4();
        this.symbol = symbol;
    }

    public getSymbol(): string {
        return this.symbol;
    }
}