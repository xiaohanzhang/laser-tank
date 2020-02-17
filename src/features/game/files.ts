import { get, map, sumBy, range, chunk } from 'lodash';

import { CMD, BoardCMD } from './game';
import { Board, Position, GameBackgrounds, GameObstacles, GameObject, Coordinate } from './tiles';
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

const TUNNEL_COLORS = [
    'FB2D0F', '36FA0E', '1538FF', '36FCFF', 'FFFB0A', 'F542F9', 'FFFFFF', 'A1A1A1'
];

export const getTunnelColor = (id: number) => {
    return TUNNEL_COLORS[id];
}

export const getTunnelId = (color: string) => {
    const index = TUNNEL_COLORS.indexOf(color);
    return index > -1 ? index + 64 : 64;
}

export const parseBoard = (tLevel: TLEVEL): { board: Board, tank: Position } => {
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
                    color: getTunnelColor((cell & 15) >> 1),
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

const array2ab = (arr: any[], size: number) => {
    const view = new Uint8Array(size);
    arr.forEach((v, i) => {
        if (i < size) {
            view[i] = v;
        }
    });
    console.log(arr);
    return view.buffer;
}

const board2ab = (board: number[][], size: number) => {
    return array2ab(([] as number[]).concat.apply([], board), size);
}

const tLevelSize: {[key: string]: [
    number, 
    (b: ArrayBuffer) => any, 
    (v: any, size: number) => ArrayBuffer 
]} = {
    board: [16 * 16, ab2array, board2ab],
    levelName: [31, ab2str, str2ab],
    hint: [256, ab2str, str2ab],
    author: [31, ab2str, str2ab],
    scoreDifficulty: [2, ab2int, int2ab],
}; // 576

export const openDataFile = (buffer: ArrayBuffer): TLEVEL[] => {
    const sizeOfTLevel = sumBy(Object.values(tLevelSize), (v) => v[0]);

    const levels = map(range(Math.floor(buffer.byteLength / sizeOfTLevel)), (i): TLEVEL => {
        let cursor = sizeOfTLevel * i;
        const data: any = {};
        map(tLevelSize, ([size, func], key) => {
            data[key] = func(buffer.slice(cursor, cursor + size));
            cursor += size;
        });

        return {
            ...data,
            board: chunk(data.board, 16),
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

const exportFile = (buffers: ArrayBuffer[], name: string) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(buffers, {type: "application/octet-stream"}));
    link.download = name;
    link.click();
}

export const exportLevelFile = (data: { 
    board: Board, 
    tank: Coordinate, 
    levelName: string,
    hint: string,
    author: string,
    scoreDifficulty: number,
}) => {
    const { board, tank, levelName, hint, author, scoreDifficulty } = data;
    const tLevelBoard = range(0, 16).map(() => {
        return range(0, 16).map(() => {
            return 0;
        });
    });
    const obstacleMap = {
        [GameObstacles.BRICKS]: 6,
        [GameObstacles.SOLID_BLOCK]: 4,
        [GameObstacles.CRYSTAL_BLOCK]: 19,
        [GameObstacles.MOVABLE_BLOCK]: 5,
        [GameObstacles.ANTI_TANK_N]: 7,
        [GameObstacles.ANTI_TANK_S]: 9,
        [GameObstacles.ANTI_TANK_W]: 10,
        [GameObstacles.ANTI_TANK_E]: 8,
        [GameObstacles.ANTI_TANK_DEAD_N]: 7,
        [GameObstacles.ANTI_TANK_DEAD_S]: 9,
        [GameObstacles.ANTI_TANK_DEAD_W]: 10,
        [GameObstacles.ANTI_TANK_DEAD_E]: 8,
        [GameObstacles.MIRROR_NW]: 11,
        [GameObstacles.MIRROR_NE]: 12,
        [GameObstacles.MIRROR_SE]: 13,
        [GameObstacles.MIRROR_SW]: 14,
        [GameObstacles.ROTARY_MIRROR_NW]: 20,
        [GameObstacles.ROTARY_MIRROR_NE]: 21,
        [GameObstacles.ROTARY_MIRROR_SE]: 22,
        [GameObstacles.ROTARY_MIRROR_SW]: 23,
        [GameObstacles.TANT]: 1,
    };
    const backgroundMap = {
        [GameBackgrounds.FLAG]: 2,
        [GameBackgrounds.DIRT]: 0,
        [GameBackgrounds.WATER]: 3, 
        [GameBackgrounds.MOVABLE_BLOCK_WATER]: 3,
        [GameBackgrounds.ICE]: 24,
        [GameBackgrounds.THIN_ICE]: 25,
        [GameBackgrounds.TANK_MOVER_N]: 15,
        [GameBackgrounds.TANK_MOVER_S]: 17,
        [GameBackgrounds.TANK_MOVER_E]: 16,
        [GameBackgrounds.TANK_MOVER_W]: 18,
        [GameBackgrounds.TUNNEL]: 64,
    };

    board.forEach((row, i) => {
        return row.forEach((tile, j) => {
            let cell = (tile.object && get(obstacleMap, tile.object)) ||
                get(backgroundMap, tile.background)
            ;
            if (tile.background === GameBackgrounds.TUNNEL) {
                cell = getTunnelId(tile.color || '');
            }
            tLevelBoard[j][i] = cell;
        });
    });
    tLevelBoard[tank.y][tank.x] = 1;
    const tLevel: any = {
        board: tLevelBoard,
        levelName,
        hint,
        author,
        scoreDifficulty,
    };

    const buffers = map(tLevelSize, ([size, fromArrayBuffer, toArrayBuffer], key) => {
        return toArrayBuffer(tLevel[key], size);
    });
    exportFile(buffers, `${levelName}.lvl`);
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
    exportFile(buffers, `level_${tRecordRec.levelIndex}.lpb`);
}