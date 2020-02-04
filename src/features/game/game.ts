import { get, each, map, range, sum, chunk, sortBy } from 'lodash';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import { getColors } from '../../utils/colors';
import { 
    nextPosition, sameCoord, isAvailable, Board, Position, GameObject, GameBackgrounds, 
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
interface NextAction {
    cmd: CMD, start: Position
}

export type DIRECTION = 'N'|'S'|'W'|'E';
export type CMD = DIRECTION | 'FIRE' | 'UNDO' | 'CHECK';

export interface PlayField {
    board: Board,
    tank: Position,
    prevTank: Position,
    laser: Position | null,
    status: Status,
    pendingTunnels: Position[],
}

export interface GameState {
    board: Board,
    tank: Position,
    prevTank: Position,
    laser: Position | null,
    laserCount: number,
    status: Status,
    pendingTunnels: Position[],
    next: NextAction[],
    timer: number,
    levels: TLEVEL[],
    levelIndex: number,
};

type Status = "WIN" | "FAIL" | "PLAYING"

const isDirection = (cmd: string): cmd is DIRECTION => {
    return ['N', 'S', 'W', 'E'].includes(cmd);
}

export const checkLaser = (state: GameState) => {
    const { laser, laserCount, tank, prevTank } = state;
    if (laser) {
        // if (
        //     sameCoord(laser, tank)
        //     //  && !(getDirection(tank, prevTank) === laser.direction && laserCount !== 1 && laserCount % 2 === 0)
        // ) {
        //     state.status = 'FAIL';
        // }
        // else {
        state.next.push({
            cmd: 'FIRE',
            start: nextPosition(laser),
        });
        // }
    }
}

class DB {
    record: CMD[] = [];
    history: PlayField[] = [];

    save(state: GameState, cmd: CMD) {
        const { board, tank, prevTank, laser, status, pendingTunnels } = state;
        this.record.push(cmd);
        this.history.push({ board, tank, prevTank, laser, status, pendingTunnels });
    }
}

const db = new DB();

const initialState: GameState = {
    board: range(0, BOARD_SIZE).map(() => {
        return range(0, BOARD_SIZE).map(() => {
            return {
                background: GameBackgrounds.DIRT,
            };
        });
    }),
    tank: {x: 0, y: 0, direction: 'N'}, 
    prevTank: {x: 0, y: 0, direction: 'N'}, 
    laser: null,
    laserCount: 0,
    status: "PLAYING",
    pendingTunnels: [],
    timer: 0,
    next: [],
    levels: [],
    levelIndex: 0,
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
            const { tank, board, levels } = state;
            const levelIndex = action.payload;
            const level = get(levels, [levelIndex]);
            if (!level) {
                return;
            }
            state.levelIndex = levelIndex;
            localStorage.setItem('levelIndex', JSON.stringify(levelIndex));
            const colors = getColors(9);
            colors.shift(); // old lasertank doesn't use back tunnels

            level.board.forEach((row, i) => {
                return row.forEach((cell, j) => {
                    if (cell === 1) {
                        tank.x = i;
                        tank.y = j;
                        board[j][i] = {
                            background: GameBackgrounds.DIRT,
                        }
                    } else if (cell > 63 && cell < 72) {
                        board[j][i] = {
                            color: colors[cell - 64],
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
            state.timer += 1;
            state.status = 'PLAYING';
        },
        changeDirection(state, action: PayloadAction<DIRECTION>) {
            state.tank.direction = action.payload;
        },
        undo(state) {
            return {
                ...state,
                ...(db.history.pop()),
                timer: state.timer + 1,
            };
        },
        moveTank(state, action: PayloadAction<DIRECTION>) {
            const { tank } = state;
            const cmd = action.payload;
            if (tank.direction === cmd) {
                const from = {...tank};
                const target = nextPosition(tank);
                state.prevTank = from;
                tank.x = target.x;
                tank.y = target.y;
                GameObject.handleMove(state, from, target);
                GameObject.checkTank(state);
                checkLaser(state);
            } else {
                tank.direction = cmd;
            }
            state.timer += 1;
        },
        renderFrame(state, action: PayloadAction<NextAction | null>) {
            const { tank, board, next } = state;
            state.next = [];
            state.prevTank = { ...tank };
            if (action?.payload) {
                next.push(action.payload);
            }
            each(sortBy(next, ({ cmd, start }) => {
                return cmd === 'FIRE' ? 0 : 
                    isDirection(cmd) ? (!sameCoord(start, tank) ? 1 : 2) :
                    3
                ;
            }), (n) => {
                const { cmd, start } = n;
                const { x, y } = start;
                if (isDirection(cmd)) {
                    // handleMove:
                    //  this.getBackground(toTile).handleMove(game, to);
                    //  this.getBackground(fromTile).handleEmpty(game, from);
                    // checkTank:
                    //  this.getObstacle(tankTile)?.checkTank(game, current);  // laser available, check fail
                    //  this.getBackground(tankTile).handleTank(game, inSkipping);
                    //      skiping:
                    //          GameObject.handleMove(game, game.prevTank, target);
                    //          GameObject.checkTank(game, true);
                    const from = { x, y, direction: cmd };
                    const target = nextPosition(from);

                    if (isAvailable(target, board)) {
                        if (board[y][x].object) {
                            board[target.y][target.x].object = board[y][x].object;
                            delete board[y][x].object;
                        } else if (sameCoord(tank, from)) {
                            tank.x = target.x;
                            tank.y = target.y;
                        }
                        GameObject.handleMove(state, from, target);
                    }
                } else if (cmd === 'FIRE') {
                    const tile = get(board, [y, x]);
                    if (tile) {
                        state.laser = { ...start };
                        state.laserCount += 1;
                        if (sameCoord(state.laser, tank)) {
                            state.status = 'FAIL';
                        }
                        GameObject.handleFire(state, state.laser);
                        // }
                    } else {
                        state.laser = null;
                    }
                } else if (cmd === 'CHECK') {
                    GameObject.checkTank(state, true);
                }
                return state.status !== 'FAIL';
            });
            if (state.status !== 'FAIL') {
                GameObject.checkTank(state);
                checkLaser(state);
            }
            state.timer += 1
        },
    },
});

export const {
    loadLevel, loadLevels, undo, changeDirection, renderFrame, moveTank
} = gameSlice.actions;

export const exec = (cmd: string): AppThunk => (dispatch, getState) => {
    const { game } = getState();
    const { tank, board, status, next, levelIndex } = game;
    if (cmd === 'UNDO') {
        dispatch(undo());
    } else if (cmd === 'NEXT_LEVEL') {
        dispatch(loadLevel(levelIndex + 1));
    } else if (cmd === 'PREV_LEVEL') {
        dispatch(loadLevel(levelIndex - 1));
    } else if (next.length === 0 && status === 'PLAYING') {
        const target = nextPosition(tank);
        if (cmd === 'FIRE') {
            db.save(game, cmd);
            dispatch(renderFrame({ cmd, start: target }));
        } else if (isDirection(cmd)) {
            if (tank.direction === cmd) {
                if (isAvailable(target, board)) {
                    db.save(game, cmd);
                    dispatch(moveTank(cmd));
                }
            } else {
                dispatch(moveTank(cmd));
            }
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

export default gameSlice.reducer;
