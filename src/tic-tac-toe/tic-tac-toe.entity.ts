import { TicTacToeDto } from '../Dtos/tic-tac-toe.dto';

export class TicTacToeEntity {
    public id: string;
    public countRow = 3;
    public countColumn = 3;
    public EMPTY_CELL = ' ';
    public field: string[][];

    constructor() {
        this.field = [];

        for (let i = 0; i < this.countRow; i++) {
            this.field[i] = [];

            for (let j = 0; j < this.countColumn; j++) {
                this.field[i][j] = this.EMPTY_CELL;
            }
        }
    }

    public static toDto(ticTacToe: TicTacToeEntity): TicTacToeDto {
        return {
            id: ticTacToe.id,
            countRow: ticTacToe.countRow,
            countColumn: ticTacToe.countColumn,
            field: ticTacToe.field,
        }
    }

    public static FromDto(ticTacToeDto: TicTacToeDto): TicTacToeEntity {
        const ticTacToe = new TicTacToeEntity();
        ticTacToe.id = ticTacToeDto.id;
        ticTacToe.countRow = ticTacToeDto.countRow;
        ticTacToe.countColumn = ticTacToeDto.countColumn;
        ticTacToe.field = ticTacToeDto.field;

        return ticTacToe;
    }
}