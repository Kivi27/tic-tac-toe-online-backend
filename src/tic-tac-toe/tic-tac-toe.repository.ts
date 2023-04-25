import { TicTacToeEntity } from './tic-tac-toe.entity';

export class TicTacToeRepository {
    private readonly ticTacToes: TicTacToeEntity[];

    public create(): TicTacToeEntity {
        const ticTacToe = new TicTacToeEntity();
        this.ticTacToes.push(ticTacToe);

        return ticTacToe;
    }
}