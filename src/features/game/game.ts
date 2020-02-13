import { get, map, max, min } from 'lodash';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import { nextPosition, isAvailable, Board, Position, GameObject, } from './tiles';
import { parseBoard } from './files';

export const BOARD_SIZE = 16;

export interface TLEVEL {
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
    PREV_FRAME = 'PREV_FRAME',
    NEXT_FRAME = 'NEXT_FRAME',
    HINT = 'HINT',
    RESTART = 'RESTART',
    SAVE_POSITION = 'SAVE_POSITION',
    RESTORE_POSITION = 'RESTORE_POSITION',
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
    cleanUp: Position[],
    timer: number,
    rendering: boolean,
    pause: boolean,
    positionSaved: boolean,
    frameIndex: number,
    levels: TLEVEL[],
};

export type Status = "WIN" | "FAIL" | "PLAYING"

class DB {
    record: RecordCMD[] = [];
    history: PlayField[] = [];
    frames: PlayField[] = [];
    snapshoot: { state: PlayField, record: RecordCMD[] } | null = null;

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

    saveFrame(state: GameState) {
        const { 
            board, tank, prevTank, laser, pending, pendingTunnels, status, levelIndex
        } = state;
        this.frames.push({
            board, tank, prevTank, laser, pending, pendingTunnels, status, levelIndex
        });
    }

    savePosition(state: GameState) {
        const { 
            board, tank, prevTank, laser, pending, pendingTunnels, status, levelIndex
        } = state;
        this.snapshoot = { 
            state: {board, tank, prevTank, laser, pending, pendingTunnels, status, levelIndex},
            record: this.record,
        };
    }
}

export const db = new DB();

export const initialState: GameState = {
    board: GameObject.createEmptyBoard(),
    tank: {x: 0, y: 0, direction: CMD.UP}, 
    prevTank: {x: 0, y: 0, direction: CMD.UP}, 
    laser: null,
    pending: [],
    pendingTunnels: [],
    status: "PLAYING",
    cleanUp: [],
    levelIndex: 0,
    timer: 0,
    rendering: false,
    pause: false,
    positionSaved: false,
    frameIndex: 0,
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
            const { levels } = state;
            const levelIndex = action.payload;
            const level = get(levels, [levelIndex]);
            console.log(`${levelIndex}: ${db.record.join('')}`);
            if (!level) {
                return;
            }
            localStorage.setItem('levelIndex', JSON.stringify(levelIndex));
            const { board, tank } = parseBoard(level);
            state.board = board;
            state.tank = tank;
            state.prevTank = {...tank};
            state.laser = null;
            state.pending = [];
            state.pendingTunnels = [];
            state.timer = state.timer === 0 ? 1 : 0;
            state.rendering = false;
            state.pause = false;
            state.status = 'PLAYING';
            state.frameIndex = 0;
            db.record = [];
            db.frames = [];
            if (state.levelIndex !== levelIndex) {
                db.history = [];
                db.snapshoot = null;
                state.levelIndex = levelIndex;
                state.positionSaved = false;
            }
        },
        undo(state) {
            db.record.pop();
            db.frames = [];
            return {
                ...state,
                ...(db.history.pop()),
                timer: state.timer + 1,
                frameIndex: 0,
            };
        },
        savePosition(state) {
            state.positionSaved = true;
        },
        restorePosition(state) {
            db.record = [...db.snapshoot?.record || []];
            db.frames = [];
            return {
                ...state,
                ...(db.snapshoot?.state || {}),
                timer: state.timer + 1,
                frameIndex: 0,
            };
        },
        setFrame(state, action: PayloadAction<number>) {
            const frameIndex = action.payload;
            return {
                ...state,
                ...(db.frames[db.frames.length - 1 - frameIndex]),
                frameIndex,
                timer: state.timer + 1,
            }
        },
        moveTank(state, action: PayloadAction<DIRECTION>) {
            const { tank } = state;
            const cmd = action.payload;
            db.frames = [];
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
            db.frames = [];
            if (!state.laser) {
                state.laser = tank;
                state.rendering = true;
                state.timer += 1;
            }
            // gameSlice.caseReducers.renderFrame(state);
        },
        renderFrame(state) {
            const { board } = state;
            const prevBoard: Board = map(board, (row) => {
                return map(row, (tile) => {
                    return {...tile};
                });
            });
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
            GameObject.checkTank(state, prevBoard);
            GameObject.cleanUp(state);
            state.timer += 1;
            state.rendering = state.status === 'PLAYING' && (
                state.rendering || Boolean(state.laser) || state.pending.length > 0
            )
        },
    },
});

export const {
    loadLevel, loadLevels, savePosition, restorePosition, moveTank, fireTank,
} = gameSlice.actions;

export const renderFrame = (): AppThunk => (dispatch, getState) => {
    dispatch(gameSlice.actions.renderFrame());
    db.saveFrame(getState().game);
}

export const exec = (cmd: CMD): AppThunk => (dispatch, getState) => {
    const actions = gameSlice.actions;
    const { game } = getState();
    const { tank, board, status, pending, laser, levelIndex, frameIndex } = game;
    if (cmd === CMD.PREV_FRAME) {
        dispatch(actions.setFrame(
            min([frameIndex + 1, db.frames.length - 1]) || 
            (db.frames.length - 1)
        ));
    } else if (cmd === CMD.NEXT_FRAME) {
        dispatch(actions.setFrame(max([frameIndex - 1, 0]) || 0));
    } else if (cmd === CMD.UNDO) {
        dispatch(actions.undo());
    } else if (cmd === CMD.RESTART) {
        dispatch(loadLevel(levelIndex));
    } else if (cmd === CMD.SAVE_POSITION && frameIndex === 0) {
        db.savePosition(game);
        dispatch(savePosition());
    } else if (cmd === CMD.RESTORE_POSITION) {
        dispatch(restorePosition());
    } else if (cmd === CMD.NEXT_LEVEL) {
        dispatch(loadLevel(levelIndex + 1));
    } else if (cmd === CMD.PREV_LEVEL) {
        dispatch(loadLevel(levelIndex - 1));
    } else if (isBoardCMD(cmd)) {
        if (frameIndex > 0) {
            dispatch(actions.setFrame(0));
        } else if (pending.length === 0 && !laser && status === 'PLAYING') {
            const target = nextPosition(tank);
            if (cmd === CMD.FIRE) {
                db.save(game, cmd);
                dispatch(fireTank());
                db.saveFrame(game);
            } else if (
                isDirection(cmd) && 
                (tank.direction !== cmd || isAvailable(target, board))
            ) {
                db.save(game, cmd);
                dispatch(moveTank(cmd));
                db.saveFrame(game);
            }
        }
    }
};

export default gameSlice;
