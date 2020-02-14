import { map, sum, range, chunk, trim } from 'lodash';

import { CMD } from './game';
import { Board, Position, GameBackgrounds, GameObject } from './tiles';
import { saveDataMap } from './consts';

export interface TLEVEL {
    board: number[][],
    levelName: string,
    hint: string,
    author: string,
    scoreDifficulty: number,
}

export const parseBoard = (tLevel: TLEVEL): { board: Board, tank: Position } => {
    const colors = [
        'FB2D0F', '36FA0E', '1538FF', '36FCFF', 'FFFB0A', 'F542F9', 'FFFFFF', 'A1A1A1'
    ];
    const board: Board = GameObject.createEmptyBoard();
    const tank: Position = {x: 0, y: 0, direction: CMD.UP};

    tLevel.board.forEach((row, i) => {
        return row.forEach((cell, j) => {
            if (cell === 1) {
                tank.x = i;
                tank.y = j;
                tank.direction = CMD.UP;
                board[j][i] = {
                    background: GameBackgrounds.DIRT,
                }
            } else if (cell > 63 && cell < 96) {
                board[j][i] = {
                    color: colors[(cell & 15) >> 1],
                    background: GameBackgrounds.TUNNEL,
                };
            } else {
                const result = saveDataMap[cell];
                if (!result) {
                    console.log(cell);
                }
                board[j][i] = {
                    background: GameBackgrounds.DIRT,
                    ...result,
                };
            }
        });
    });
    return { board, tank };
}

const toString = (buffer: ArrayBuffer) => {
    return String.fromCharCode.apply(
        null, Array.from(new Uint8Array(buffer)).filter(Boolean)
    );
}

export const openDataFile = (buffer: ArrayBuffer): TLEVEL[] => {
    const tLevel = {
        board: 16 * 16,
        levelName: 31,
        hint: 256,
        author: 31,
        scoreDifficulty: 2,
    }; // 576
    const sizeOfTLevel = sum(Object.values(tLevel));

    const levels = map(range(Math.floor(buffer.byteLength / sizeOfTLevel)), (i): TLEVEL => {
        let cursor = sizeOfTLevel * i;
        const data: any = {};
        map(tLevel, (size, key) => {
            data[key] = buffer.slice(cursor, cursor + size);
            cursor += size;
        });

        return {
            board: chunk(Array.from(new Uint8Array(data.board)), 16),
            levelName: toString(data.levelName),
            hint: toString(data.hint),
            author: toString(data.author),
            scoreDifficulty: new Uint16Array(data.scoreDifficulty)[0],
        }
    });
    return levels;
};