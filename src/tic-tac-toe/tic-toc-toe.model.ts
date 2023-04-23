import { PlayerModel } from '../player/player.model';

export class TicTocToeModel {
    private readonly countRow = 3;
    private readonly countColumn = 3;
    private readonly EMPTY_CELL = ' ';

    private readonly field: string[][];

    constructor() {
        this.field = [];

        for (let i = 0; i < this.countRow; i++) {
            this.field[i] = [];

            for (let j = 0; j < this.countColumn; j++) {
                this.field[i][j] = this.EMPTY_CELL;
            }
        }
    }

    public step(selectRow: number, selectColumn: number, player: PlayerModel): PlayerModel | undefined {
        if (!this.isFreeCell(selectRow, selectColumn)) return;

        this.changeCell(selectRow, selectColumn, player);

        return this.isWin(player) ? player : undefined;
    }

    private isFreeCell(selectRow: number, selectColumn: number): boolean {
        return this.field[selectRow][selectColumn] === this.EMPTY_CELL;
    }
    private changeCell(selectRow: number, selectColumn: number, player: PlayerModel): void {
        this.field[selectRow][selectColumn] = player.getSymbol();
    }

    public debugPrint(): void {
        for (let i = 0; i < this.countRow; i++) {
            let str = '';
            for (let j = 0; j < this.countColumn; j++) {
                str += this.field[i][j] + '|';
            }
            console.log(str);
        }
    }

    private isWin(player: PlayerModel): boolean {
        return this.isWinHorizontal(player)
            || this.isWinVertical(player)
            || this.isWinMainDiagonal(player)
            || this.isWinSideDiagonal(player);
    }

    private isWinHorizontal(player: PlayerModel): boolean {
        const playerSymbol = player.getSymbol();

        for (let i = 0; i < this.countRow; i++) {
            let countWinCell = 0;

            for (let j = 0; j < this.countColumn; j++) {
                if (this.field[i][j] === playerSymbol) {
                    countWinCell++;
                }
            }

            if (countWinCell === this.countRow) return true;
        }

        return false;
    }

    private isWinVertical(player: PlayerModel): boolean {
        const playerSymbol = player.getSymbol();
        for (let i = 0; i < this.countColumn; i++) {
            let countWinCell = 0;

            for (let j = 0; j < this.countRow; j++) {
                if (this.field[j][i] === playerSymbol) {
                    countWinCell++;
                }
            }

            if (countWinCell === this.countColumn) return true;
        }

        return false;
    }

    private isWinMainDiagonal(player: PlayerModel): boolean {
        const playerSymbol = player.getSymbol();
        let countWinCell = 0;

        for (let i = 0; i < this.countRow; i++) {
            if (this.field[i][i] === playerSymbol) {
                countWinCell++;
            }
        }

        return countWinCell === this.countRow;
    }

    private isWinSideDiagonal(player: PlayerModel): boolean {
        const playerSymbol = player.getSymbol();
        let countWinCell = 0;

        for (let i = 0; i < this.countRow; i++) {
            const columnIndex = this.countColumn - i - 1;

            if (this.field[i][columnIndex] === playerSymbol) {
                countWinCell++;
            }
        }

        return countWinCell === this.countRow;
    }
}