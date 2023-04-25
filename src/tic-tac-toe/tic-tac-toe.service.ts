import { PlayerEntity } from '../player/player.entity';
import { TicTacToeRepository } from './tic-tac-toe.repository';
import { TicTacToeEntity } from './tic-tac-toe.entity';
import { TicTacToeDto } from '../Dtos/tic-tac-toe.dto';

export class TicTacToeService {
    private readonly ticTacToeRepository: TicTacToeRepository;

    constructor(ticTacToeRepository: TicTacToeRepository) {
        this.ticTacToeRepository = ticTacToeRepository;
    }

    public create(): TicTacToeDto {
        const ticTacToe = this.ticTacToeRepository.create();

        return TicTacToeEntity.toDto(ticTacToe);
    }

    public step(
        ticTacToeDto: TicTacToeDto,
        selectRow: number,
        selectColumn: number,
        player: PlayerEntity
    ): PlayerEntity | undefined {
        const ticTacToe = TicTacToeEntity.FromDto(ticTacToeDto);

        if (!this.isFreeCell(ticTacToe,selectRow, selectColumn)) return;

        this.changeCell(ticTacToe, selectRow, selectColumn, player);

        return this.isWin(ticTacToe, player) ? player : undefined;
    }

    public debugPrint(ticTacToeDto: TicTacToeDto): void {
        const ticTacToe = TicTacToeEntity.FromDto(ticTacToeDto);

        for (let i = 0; i < ticTacToe.countRow; i++) {
            let str = '';
            for (let j = 0; j < ticTacToe.countColumn; j++) {
                str += ticTacToe.field[i][j] + '|';
            }
            console.log(str);
        }
    }

    private isFreeCell(
        ticTacToe: TicTacToeEntity,
        selectRow: number,
        selectColumn: number
    ): boolean {
        return ticTacToe.field[selectRow][selectColumn] === ticTacToe.EMPTY_CELL;
    }

    private changeCell(
        ticTacToe: TicTacToeEntity,
        selectRow: number,
        selectColumn: number,
        player: PlayerEntity
    ): void {
        ticTacToe.field[selectRow][selectColumn] = player.symbol;
    }

    private isWin(ticTacToe: TicTacToeEntity, player: PlayerEntity): boolean {
        return this.isWinHorizontal(ticTacToe, player)
            || this.isWinVertical(ticTacToe, player)
            || this.isWinMainDiagonal(ticTacToe, player)
            || this.isWinSideDiagonal(ticTacToe, player);
    }

    private isWinHorizontal(ticTacToe: TicTacToeEntity, player: PlayerEntity): boolean {
        const playerSymbol = player.symbol;

        for (let i = 0; i < ticTacToe.countRow; i++) {
            let countWinCell = 0;

            for (let j = 0; j < ticTacToe.countColumn; j++) {
                if (ticTacToe.field[i][j] === playerSymbol) {
                    countWinCell++;
                }
            }

            if (countWinCell === ticTacToe.countRow) return true;
        }

        return false;
    }

    private isWinVertical(ticTacToe: TicTacToeEntity, player: PlayerEntity): boolean {
        const playerSymbol = player.symbol;
        for (let i = 0; i < ticTacToe.countColumn; i++) {
            let countWinCell = 0;

            for (let j = 0; j < ticTacToe.countRow; j++) {
                if (ticTacToe.field[j][i] === playerSymbol) {
                    countWinCell++;
                }
            }

            if (countWinCell === ticTacToe.countColumn) return true;
        }

        return false;
    }

    private isWinMainDiagonal(ticTacToe: TicTacToeEntity, player: PlayerEntity): boolean {
        const playerSymbol = player.symbol;
        let countWinCell = 0;

        for (let i = 0; i < ticTacToe.countRow; i++) {
            if (ticTacToe.field[i][i] === playerSymbol) {
                countWinCell++;
            }
        }

        return countWinCell === ticTacToe.countRow;
    }

    private isWinSideDiagonal(ticTacToe: TicTacToeEntity, player: PlayerEntity): boolean {
        const playerSymbol = player.symbol;
        let countWinCell = 0;

        for (let i = 0; i < ticTacToe.countRow; i++) {
            const columnIndex = ticTacToe.countColumn - i - 1;

            if (ticTacToe.field[i][columnIndex] === playerSymbol) {
                countWinCell++;
            }
        }

        return countWinCell === ticTacToe.countRow;
    }
}