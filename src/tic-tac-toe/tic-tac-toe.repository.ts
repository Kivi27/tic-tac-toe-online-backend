import { TicTacToeEntity } from './tic-tac-toe.entity';
import { v4 as uuidv4 } from 'uuid';

export class TicTacToeRepository {
    private ticTacToes: TicTacToeEntity[];

    constructor() {
        this.ticTacToes = [];
    }

    public create(): TicTacToeEntity {
        const ticTacToe = new TicTacToeEntity();
        ticTacToe.id = uuidv4();
        ticTacToe.symbolNextPlayer = 'X';

        this.ticTacToes.push(ticTacToe);

        return ticTacToe;
    }

    public getById(ticTacToeId: string): TicTacToeEntity | undefined {
        return this.ticTacToes.find((ticTacToe: TicTacToeEntity) => ticTacToe.id === ticTacToeId);
    }

    public delete(ticTacToeId: string): void {
        this.ticTacToes = this.ticTacToes.filter((ticTacToe: TicTacToeEntity) => ticTacToe.id !== ticTacToeId);
    }
}