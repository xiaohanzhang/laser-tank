import { map, sum, range, chunk } from 'lodash';

import { CMD, BoardCMD } from './game';
import { Board, Position, GameBackgrounds, GameObject } from './tiles';
import { saveDataMap } from './consts';

export interface TLEVEL {
    board: number[][],
    levelName: string,
    hint: string,
    author: string,
    scoreDifficulty: number,
}

export interface TRECORDREC	{
	levelName: string,  // char LName[31];  // Level Name
	author: string,     // char Author[31];	// Author of the recording
	levelIndex: number,      // WORD Level;		// Level Number
    // size: number,       // WORD Size;		// Size of Data -- Data to fallow
    records: BoardCMD[],
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

const ab2str = (buffer: ArrayBuffer) => {
    return String.fromCharCode.apply(
        null, Array.from(new Uint8Array(buffer)).filter(Boolean)
    );
}

const ab2int = (buffer: ArrayBuffer) => {
    return new Uint16Array(buffer)[0];
}

const ab2array = (buffer: ArrayBuffer) => {
    return Array.from(new Uint8Array(buffer));
}

const str2ab = (str: string, size: number) => {
    const view = new Uint8Array(size);
    for (let i = 0; i < str.length && i < size; i++) {
        view[i] = str.charCodeAt(i);
    }
    return view.buffer;
}

const int2ab = (n: number, size: number) => {
    const view = new Uint16Array(1);
    view[0] = n;
    return view.buffer;
}

const array2ab = (arr: [], size: number) => {
    const view = new Uint8Array(size);
    arr.forEach((v, i) => {
        if (i < size) {
            view[i] = v;
        }
    });
    return view.buffer;
}

const tLevelSize = {
    board: 16 * 16,
    levelName: 31,
    hint: 256,
    author: 31,
    scoreDifficulty: 2,
}; // 576
export const openDataFile = (buffer: ArrayBuffer): TLEVEL[] => {
    console.log(buffer);
    const sizeOfTLevel = sum(Object.values(tLevelSize));

    const levels = map(range(Math.floor(buffer.byteLength / sizeOfTLevel)), (i): TLEVEL => {
        let cursor = sizeOfTLevel * i;
        const data: any = {};
        map(tLevelSize, (size, key) => {
            data[key] = buffer.slice(cursor, cursor + size);
            cursor += size;
        });

        return {
            board: chunk(Array.from(new Uint8Array(data.board)), 16),
            levelName: ab2str(data.levelName),
            hint: ab2str(data.hint),
            author: ab2str(data.author),
            scoreDifficulty: new Uint16Array(data.scoreDifficulty)[0],
        }
    });
    return levels;
};

const tRecordRecSize: {[key: string]: [
    number, 
    (b: ArrayBuffer) => any, 
    (v: any, size: number) => ArrayBuffer 
]} = {
    levelName: [31, ab2str, str2ab],
    author: [31, ab2str, str2ab],
    levelIndex: [2, ab2int, int2ab],
    size: [2, ab2int, int2ab],
};
export const openReplayFile = (buffer: ArrayBuffer): TRECORDREC => {
    const data: any = {};
    let cursor = 0;
    map(tRecordRecSize, ([size, func], key) => {
        data[key] = func(buffer.slice(cursor, cursor + size));
        cursor += size;
    });

    // 32 fire, 37 W, 38 N, 39 E, 40 S, 
    const recordsSize = data.size;
    delete data.size;
    return {
        ...data,
        records: map(
            new Uint8Array(buffer.slice(cursor, cursor + recordsSize)),
            (v) => {
                const cmdMap: {[key: number]: BoardCMD} = {
                    32: CMD.FIRE,
                    37: CMD.LEFT,
                    38: CMD.UP,
                    39: CMD.RIGHT,
                    40: CMD.DOWN,
                };
                if (!(v in cmdMap)) {
                    throw new Error(`wrong data in rec file: ${v}`);
                }
                return cmdMap[v];
            }
        ),
    }
}

export const exportReplayFile = (tRecordRec: TRECORDREC) => {
    const cmdMap: {[key in BoardCMD]: number} = {
        [CMD.FIRE]: 32,
        [CMD.LEFT]: 37,
        [CMD.UP]: 38,
        [CMD.RIGHT]: 39,
        [CMD.DOWN]: 40,
    };
    const records = map(tRecordRec.records, (cmd) => {
        return cmdMap[cmd];
    });
    const data: any = {
        ...tRecordRec,
        levelIndex: 26,
        size: records.length,
        records,
    };
    const dataSize: {[key: string]: [
        number, 
        (b: ArrayBuffer) => any, 
        (v: any, size: number) => ArrayBuffer 
    ]} = {
        ...tRecordRecSize,
        records: [records.length, ab2array, array2ab],
    };
    const buffers = map(dataSize, ([size, fromArrayBuffer, toArrayBuffer], key) => {
        return toArrayBuffer(data[key], size);
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(buffers, {type: "application/octet-stream"}));
    link.download = `level_${tRecordRec.levelIndex}.lpb`;
    link.click();
}