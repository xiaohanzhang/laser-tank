import { get, map, range, sum, chunk } from 'lodash';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import { 
    nextPosition, isAvailable, Board, Position, GameObject, GameBackgrounds,  
} from './tiles';
import { saveDataMap } from './consts';

export const BOARD_SIZE = 16;

interface TLEVEL {
    board: number[][],
    levelName: string,
    hint: string,
    author: string,
    scoreDifficulty: number,
}

export enum CMD {
    UP = 'N',
    DOWN = 'S',
    LEFT = 'W',
    RIGHT = 'E',
    FIRE_UP = '0',
    FIRE_DOWN = '1',
    FIRE_LEFT = '2',
    FIRE_RIGHT = '3',
    FIRE = ' ',
    UNDO = 'UNDO',
    PAUSE = 'PAUSE',
    NEXT_LEVEL = 'NEXT_LEVEL',
    PREV_LEVEL = 'PREV_LEVEL',
    HINT = 'HINT',
};

export type DIRECTION = CMD.UP|CMD.DOWN|CMD.LEFT|CMD.RIGHT;
export const isDirection = (cmd: CMD): cmd is DIRECTION => {
    return [CMD.UP, CMD.DOWN, CMD.LEFT, CMD.RIGHT].includes(cmd);
}
export type FIRE_DIRECTION = CMD.FIRE_UP|CMD.FIRE_DOWN|CMD.FIRE_LEFT|CMD.FIRE_RIGHT;

type BoardCMD = DIRECTION|CMD.FIRE;
const isBoardCMD = (cmd: CMD): cmd is BoardCMD => {
    return isDirection(cmd) || cmd === CMD.FIRE;
}
export type RecordCMD = DIRECTION|FIRE_DIRECTION;

export interface PlayField {
    board: Board,
    tank: Position,
    prevTank: Position,
    laser: Position | null,
    pending: {from: Position, to: Position}[], // may not need this
    pendingTunnels: Position[],
    status: Status,
    levelIndex: number,
}

export interface GameState extends PlayField {
    timer: number,
    rendering: boolean,
    pause: boolean,
    levels: TLEVEL[],
};

type Status = "WIN" | "FAIL" | "PLAYING"

class DB {
    record: RecordCMD[] = [];
    history: PlayField[] = [];

    save(state: GameState, cmd: BoardCMD) {
        const { 
            board, tank, prevTank, laser, pending, pendingTunnels, status, levelIndex
        } = state;
        if (cmd === CMD.FIRE) {
            const fireMap: {[key in DIRECTION]: RecordCMD} = {
                [CMD.UP]: CMD.FIRE_UP,
                [CMD.DOWN]: CMD.FIRE_DOWN,
                [CMD.LEFT]: CMD.FIRE_LEFT,
                [CMD.RIGHT]: CMD.FIRE_RIGHT,
            };
            this.record.push(fireMap[tank.direction]);
        } else {
            this.record.push(cmd);
        }
        this.history.push({ 
            board, tank, prevTank, laser, pending, pendingTunnels, status, levelIndex
        });
    }
}

export const db = new DB();

export const initialState: GameState = {
    board: range(0, BOARD_SIZE).map(() => {
        return range(0, BOARD_SIZE).map(() => {
            return {
                background: GameBackgrounds.DIRT,
            };
        });
    }),
    tank: {x: 0, y: 0, direction: CMD.UP}, 
    prevTank: {x: 0, y: 0, direction: CMD.UP}, 
    laser: null,
    pending: [],
    pendingTunnels: [],
    status: "PLAYING",
    levelIndex: 0,
    timer: 0,
    rendering: false,
    pause: false,
    levels: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        loadLevels(state, action: PayloadAction<{ levels: TLEVEL[], levelIndex: number }>) {
            const { levels, levelIndex } = action.payload;
            state.levels = levels;
            localStorage.setItem('levels', JSON.stringify(levels));
            gameSlice.caseReducers.loadLevel(state, loadLevel(levelIndex));
        },
        loadLevel(state, action: PayloadAction<number>) {
            const { board, tank, levels } = state;
            const levelIndex = action.payload;
            const level = get(levels, [levelIndex]);
            if (!level) {
                return;
            }
            state.levelIndex = levelIndex;
            localStorage.setItem('levelIndex', JSON.stringify(levelIndex));
            const colors = ['FB2D0F', '36FA0E', '1538FF', '36FCFF', 'FFFB0A', 'F542F9', 'FFFFFF', 'A1A1A1'];
            // getColors(9);
            // colors.shift(); // old lasertank doesn't use back tunnels

            level.board.forEach((row, i) => {
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
            state.prevTank = {...tank};
            state.laser = null;
            state.pending = [];
            state.pendingTunnels = [];
            state.timer = state.timer === 0 ? 1 : 0;
            state.rendering = false;
            state.pause = false;
            state.status = 'PLAYING';
            console.log(db.record.join(''));
            db.record = [];
        },
        undo(state) {
            return {
                ...state,
                ...(db.history.pop()),
                timer: state.timer + 1,
            };
        },
        togglePause(state) {
            state.pause = !state.pause;
        },
        moveTank(state, action: PayloadAction<DIRECTION>) {
            const { tank } = state;
            const cmd = action.payload;
            if (tank.direction === cmd) {
                GameObject.moveTank(state, nextPosition(tank), true);
            } else {
                tank.direction = cmd;
                state.prevTank = { ...tank };
            }
            state.timer += 1;
            state.rendering = state.status !== 'FAIL';
        },
        fireTank(state) {
            const { tank } = state;
            if (!state.laser) {
                state.laser = tank;
            }
            gameSlice.caseReducers.renderFrame(state);
        },
        renderFrame(state) {
            state.rendering = false;
            // move laser
            // check fail 
            // obstacle handle laser 
            //      move obstacle, pending target and src
            GameObject.checkLaser(state);
            // handle landing obstacle 
            // handle leaving obstacle
            GameObject.checkPending(state);
            // obstacle sawTank
            // background handleTank
            GameObject.checkTank(state);
            state.timer += 1;
            state.rendering = state.status === 'PLAYING' && (
                state.rendering || Boolean(state.laser) || state.pending.length > 0
            )
        },
    },
});

export const {
    loadLevel, loadLevels, undo, togglePause, renderFrame, moveTank, fireTank,
} = gameSlice.actions;

export const exec = (cmd: CMD): AppThunk => (dispatch, getState) => {
    const { game } = getState();
    const { tank, board, status, pending, laser, levelIndex } = game;
    if (cmd === CMD.UNDO) {
        dispatch(undo());
    } else if (cmd === CMD.PAUSE) {
        dispatch(togglePause());
    } else if (cmd === CMD.NEXT_LEVEL) {
        dispatch(loadLevel(levelIndex + 1));
    } else if (cmd === CMD.PREV_LEVEL) {
        dispatch(loadLevel(levelIndex - 1));
    } else if (isBoardCMD(cmd) && pending.length === 0 && !laser && status === 'PLAYING') {
        const target = nextPosition(tank);
        if (cmd === CMD.FIRE) {
            db.save(game, cmd);
            dispatch(fireTank());
        } else if (isDirection(cmd) && (tank.direction !== cmd || isAvailable(target, board))) {
            db.save(game, cmd);
            dispatch(moveTank(cmd));
        }
    }
};

export const openDataFile = (buffer: ArrayBuffer): AppThunk => (dispatch) => {
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
            levelName: String.fromCharCode.apply(null, Array.from(new Uint8Array(data.levelName))),
            hint: String.fromCharCode.apply(null, Array.from(new Uint8Array(data.hint))),
            author: String.fromCharCode.apply(null, Array.from(new Uint8Array(data.author))),
            scoreDifficulty: new Uint16Array(data.scoreDifficulty)[0],
        }
    });
    dispatch(loadLevels({
        levels,
        levelIndex: 0, 
    }));
};

export default gameSlice;
