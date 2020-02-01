import { get, range } from 'lodash';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import { getColors } from '../../utils/colors';
import { 
    nextPosition, sameCoord, isAvailable, Board, Tile, Position, GameObject, GameBackgrounds
} from './tiles';
import { saveDataMap } from './consts';

export const BOARD_SIZE = 16;

type SaveData = number[][];
interface NextAction {
    cmd: CMD, start: Position
}

export type DIRECTION = 'N'|'S'|'W'|'E';
export type CMD = DIRECTION | 'FIRE' | 'UNDO';

export interface GameState {
    board: Board,
    tank: Position,
    laser: Position | null,
    status: Status,
    pendingTunnels: Position[],
    timer: number,
    next: NextAction[],
};

type Status = "WIN" | "FAIL" | "PLAYING"

const isDirection = (cmd: string): cmd is DIRECTION => {
    return ['N', 'S', 'W', 'E'].includes(cmd);
}

class DB {
    record: CMD[] = [];
    history: GameState[] = [];

    save(state: GameState, cmd: CMD) {
        this.record.push(cmd);
        this.history.push(state);
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
    laser: null,
    status: "PLAYING",
    pendingTunnels: [],
    timer: 0,
    next: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        loadLevel(state, action: PayloadAction<SaveData>) {
            const { tank } = state;
            const colors = getColors(9);
            colors.shift(); // old lasertank doesn't use back tunnels

            state.board = action.payload.map((row, i) => {
                return row.map((cell, j): Tile => {
                    if (cell === 1) {
                        tank.x = j;
                        tank.y = i;
                        return {
                            background: GameBackgrounds.DIRT,
                        }
                    } else if (cell > 63 && cell < 72) {
                        return {
                            color: colors[cell - 64],
                            background: GameBackgrounds.TUNNEL,
                        };
                    }
                    const result = saveDataMap[cell];
                    if (!result) {
                        console.log(cell);
                    }
                    return {
                        background: GameBackgrounds.DIRT,
                        ...result,
                    };
                });
            });
        },
        changeDirection(state, action: PayloadAction<DIRECTION>) {
            state.tank.direction = action.payload;
        },
        move(state, action: PayloadAction<Position>) {
            const { x, y } = action.payload;
            const target = nextPosition(action.payload);
            const { tank, board } = state;
            if (isAvailable(target, board)) {
                if (board[y][x].object) {
                    board[target.y][target.x].object = board[y][x].object;
                    delete board[y][x].object;
                } else if (tank.x === x && tank.y === y) {
                    tank.x = target.x;
                    tank.y = target.y;
                }
                GameObject.handleMove(state, action.payload, target);
            }
        },
        fire(state, action: PayloadAction<NextAction>) {
            const { tank, board } = state;
            const { start } = action.payload;
            const { x, y } = start;
            const tile = get(board, [y, x]);
            if (tile) {
                if (sameCoord(start, tank)) {
                    state.status = 'FAIL';
                } else {
                    state.laser = start;
                    GameObject.handleFire(state, start);
                }
            } else {
                state.laser = null;
            }
        },
        startCycle(state) {
            state.next = [];
        },
        finishCycle(state) {
            const { tank } = state;
            GameObject.checkTank(state);
            const laser = state.laser;
            if (laser) {
                if (sameCoord(laser, tank)) {
                    state.status = 'FAIL';
                } else {
                    const target = nextPosition(laser);
                    state.next.push({
                        cmd: 'FIRE',
                        start: target,
                    });
                }
            }
            state.timer += 1
        },
        undo() {
            return db.history.pop();
        },
        moveTank(state, action: PayloadAction<DIRECTION>) {
            const { tank } = state;
            const cmd = action.payload;
            if (tank.direction === cmd) {
                gameSlice.caseReducers.renderFrame(state, renderFrame({ cmd, start: {...tank }}));
            } else {
                tank.direction = cmd;
            }
            state.timer += 1;
        },
        renderFrame(state, action: PayloadAction<NextAction | null>) {
            const { tank, board, next } = state;
            state.next = [];
            if (action?.payload) {
                next.push(action.payload);
            }
            next.forEach((n) => {
                const { cmd, start } = n;
                const { x, y } = start;
                if (isDirection(cmd)) {
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
                        if (sameCoord(start, tank)) {
                            state.status = 'FAIL';
                        } else {
                            state.laser = { ...start };
                            GameObject.handleFire(state, state.laser);
                        }
                    } else {
                        state.laser = null;
                    }
                }
            });
            GameObject.checkTank(state);
            const laser = state.laser;
            if (laser) {
                if (sameCoord(laser, tank)) {
                    state.status = 'FAIL';
                } else {
                    const target = nextPosition(laser);
                    state.next.push({
                        cmd: 'FIRE',
                        start: target,
                    });
                }
            }
            state.timer += 1
        },
    },
});

export const {
    loadLevel, move, fire, undo, changeDirection, startCycle, finishCycle, renderFrame, moveTank
} = gameSlice.actions;

export const exec = (cmd: CMD): AppThunk => (dispatch, getState) => {
    const { game } = getState();
    const { tank, board, status, next } = game;
    if (cmd === 'UNDO') {
        dispatch(undo());
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

export default gameSlice.reducer;
