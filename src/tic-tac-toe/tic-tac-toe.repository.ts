import { TicTacToeEntity } from './tic-tac-toe.entity';

export class TicTacToeRepository {
    private readonly ticTacToes: TicTacToeEntity[];

    public create(): TicTacToeEntity {
        const ticTacToe = new TicTacToeEntity();
        this.ticTacToes.push(ticTacToe);

        return ticTacToe;
    }

    public getById(ticTacToeId: string): TicTacToeEntity | undefined {
        return this.ticTacToes.find((ticTacToe: TicTacToeEntity) => ticTacToe.id === ticTacToeId);
    }
}