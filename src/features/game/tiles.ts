import { get, each, range, reverse, findIndex } from 'lodash';
import {  GameState, DIRECTION, BOARD_SIZE, CMD } from './game';

export enum GameBackgrounds {
    // background
    FLAG = 1,
    DIRT,
    WATER,
    MOVABLE_BLOCK_WATER,
    ICE,
    THIN_ICE,
    TANK_MOVER_N,
    TANK_MOVER_S,
    TANK_MOVER_E,
    TANK_MOVER_W,
    TUNNEL,
}

export enum GameObstacles {
    // obstacle
    BRICKS = 32,
    SOLID_BLOCK = 33,
    CRYSTAL_BLOCK = 34,
    MOVABLE_BLOCK = 35,
    ANTI_TANK_N = 36,
    ANTI_TANK_S = 37,
    ANTI_TANK_W = 38,
    ANTI_TANK_E = 39,
    ANTI_TANK_DEAD_N = 40,
    ANTI_TANK_DEAD_S,
    ANTI_TANK_DEAD_W,
    ANTI_TANK_DEAD_E,
    MIRROR_NW,
    MIRROR_NE,
    MIRROR_SE,
    MIRROR_SW,
    ROTARY_MIRROR_NW,
    ROTARY_MIRROR_NE,
    ROTARY_MIRROR_SE,
    ROTARY_MIRROR_SW,
}

export const sameCoord = (p1: Position | null, p2: Position | null): boolean => {
    return p1 === p2 || (!!p1 && !!p2 && p1.x === p2.x && p1.y === p2.y); 
}

// get direction of p2 relative to p1
export const getDirection = (p1: Coordinate, p2: Coordinate): DIRECTION | null => {
    if (p1.x !== p2.x || p1.y !== p2.y) {
        if (p1.x === p2.x) {
            return p1.y > p2.y ? CMD.UP : CMD.DOWN;
        } else if (p1.y === p2.y) {
            return p1.x > p2.x ? CMD.LEFT : CMD.RIGHT;
        }
    }
    return null;
} 

const reverseDirection = (direction: DIRECTION): DIRECTION => {
    const reverseMap: {[key: string]: DIRECTION} = {
        [CMD.UP]: CMD.DOWN, 
        [CMD.DOWN]: CMD.UP, 
        [CMD.LEFT]: CMD.RIGHT, 
        [CMD.RIGHT]: CMD.LEFT, 
    };
    return reverseMap[direction];
}

const fireLasert = (game: GameState, laser: Position, force: boolean = false) => {
    if (game.laser === null || force) {
        game.laser = laser;
        // TODO: add this to impelemnt odd/even tank bug
        if (sameCoord(laser, game.tank)) {
            game.status = 'FAIL';
        }
    }
}

const forEachTile = (board: Board, position: Position, callback: (tile: Tile, position: Position) => void | boolean) => {
    let target = nextPosition(position);
    while (target.x < BOARD_SIZE && target.y < BOARD_SIZE && target.x >= 0 && target.y >= 0) {
        if (callback(board[target.y][target.x], target) === false) {
            break;
        }
        target = nextPosition(target);
    }
}

export const isAvailable = (position: Coordinate, board: Board): boolean => {
    const { x, y } = position;
    const target = get(board, `${y}.${x}`);
    return !!(target && !target.object);
}

export const nextPosition = (position: Position) => {
    const { x, y, direction } = position;
    return {
        [CMD.UP]: { x, y: y - 1, direction },
        [CMD.DOWN]: { x, y: y + 1, direction },
        [CMD.RIGHT]: { x: x + 1, y, direction },
        [CMD.LEFT]: { x: x - 1, y, direction },
    }[direction];
}

export interface Tile {
    background: GameBackgrounds,
    color?: string,
    object?: GameObstacles,
};

export type Board = Tile[][]; 

export interface Coordinate {
    x: number,
    y: number,
}

export interface Position extends Coordinate {
    direction: DIRECTION,
}

export class GameObject {
    static createEmptyBoard() {
        return range(0, BOARD_SIZE).map(() => {
            return range(0, BOARD_SIZE).map(() => {
                return {
                    background: GameBackgrounds.DIRT,
                };
            });
        })
    }

    static getBackgroundClass(background: GameBackgrounds) {
        return {
            [GameBackgrounds.FLAG]: Flag,
            [GameBackgrounds.DIRT]: Dirt,
            [GameBackgrounds.WATER]: Water, 
            [GameBackgrounds.MOVABLE_BLOCK_WATER]: MovableBlockWater,
            [GameBackgrounds.ICE]: Ice,
            [GameBackgrounds.THIN_ICE]: ThinIce,
            [GameBackgrounds.TANK_MOVER_N]: TankMoverN,
            [GameBackgrounds.TANK_MOVER_S]: TankMoverS,
            [GameBackgrounds.TANK_MOVER_E]: TankMoverE,
            [GameBackgrounds.TANK_MOVER_W]: TankMoverW,
            [GameBackgrounds.TUNNEL]: Tunnel,
        }[background];
    }

    static getObstacleClass(obstacle: GameObstacles) {
        return {
            [GameObstacles.BRICKS]: Bricks,
            [GameObstacles.SOLID_BLOCK]: SolidBlock,
            [GameObstacles.CRYSTAL_BLOCK]: CrystalBlock,
            [GameObstacles.MOVABLE_BLOCK]: MovableBlock,
            [GameObstacles.ANTI_TANK_N]: AntiTankN,
            [GameObstacles.ANTI_TANK_S]: AntiTankS,
            [GameObstacles.ANTI_TANK_W]: AntiTankW,
            [GameObstacles.ANTI_TANK_E]: AntiTankE,
            [GameObstacles.ANTI_TANK_DEAD_N]: AntiTankDeadN,
            [GameObstacles.ANTI_TANK_DEAD_S]: AntiTankDeadS,
            [GameObstacles.ANTI_TANK_DEAD_W]: AntiTankDeadW,
            [GameObstacles.ANTI_TANK_DEAD_E]: AntiTankDeadE,
            [GameObstacles.MIRROR_NW]: MirrorNW,
            [GameObstacles.MIRROR_NE]: MirrorNE,
            [GameObstacles.MIRROR_SE]: MirrorSE,
            [GameObstacles.MIRROR_SW]: MirrorSW,
            [GameObstacles.ROTARY_MIRROR_NW]: RotaryMirrorNW,
            [GameObstacles.ROTARY_MIRROR_NE]: RotaryMirrorNE,
            [GameObstacles.ROTARY_MIRROR_SE]: RotaryMirrorSE,
            [GameObstacles.ROTARY_MIRROR_SW]: RotaryMirrorSW,
        }[obstacle];
    }

    static getBackground(tile: Tile) {
        return new (this.getBackgroundClass(tile.background))();
    }

    static getObstacle(tile: Tile) {
        return !tile.object ? null : new (this.getObstacleClass(tile.object))();
    }

    static checkLaser(state: GameState) {
        const { laser, tank, board } = state;
        if (laser) {
            const target = nextPosition(laser);
            const tile = get(board, [target.y, target.x]);
            if (tile) {
                state.laser = target;
                if (sameCoord(target, tank)) {
                    state.status = 'FAIL';
                } else {
                    this.getObstacle(tile)?.handleLaser(state, target);
                }
            } else {
                state.laser = null;
            }
            if (!state.laser) {
                this.checkFire(state);
            }
        }
    }

    static checkPending(game: GameState) {
        const { pending } = game;
        if (game.status === 'FAIL') {
            return;
        }
        game.pending = [];
        each(
            reverse(pending), 
            ({ from, to }) => {
                this.handlePending(game, from , to)
            }
        );
        game.pending = reverse(game.pending);
    }

    static handlePending(game: GameState, from: Position, to: Position) {
        const { board } = game;
        const toTile = get(board, [to.y, to.x]);
        if (from) {
            const fromTile = get(board, [from.y, from.x]);
            this.getBackground(fromTile).handleLeaving(game, from);
        }
        this.getBackground(toTile).handleLanding(game, from, to);
        return game.status !== 'FAIL';
    }

    static checkTank(game: GameState, prevBoard: Board) {
        const { board, tank } = game;
        const tile = board[tank.y][tank.x];
        if (game.status !== 'FAIL') {
            if (!tile.object) {
                this.checkFire(game);
            }
            const background = this.getBackground(board[tank.y][tank.x]);
            if (background.shouldCheckTank(game, prevBoard)) {
                background.handleTank(game, false);
            }
        }
    }

    static checkFire(game: GameState) {
        const { board, tank } = game;
        const tile = board[tank.y][tank.x];
        if (!tile.object && game.status !== 'FAIL') {
            each([CMD.RIGHT, CMD.LEFT, CMD.DOWN, CMD.UP], (direction: DIRECTION) => {
                forEachTile(board, { ...tank, direction }, (tile, current) => {
                    return this.getObstacle(tile)?.sawTank(game, current);
                });
                return game.status !== 'FAIL';
            });
        }
    }

    static cleanUp(game: GameState) {
        const { cleanUp, board } = game;
        game.cleanUp = [];
        each(cleanUp, (position) => {
            this.getBackground(board[position.y][position.x]).cleanUp(game, position);
        });
    }

    static moveTank(game: GameState, to: Position, handle: boolean = false, inSkipping: boolean = false) {
        const { board, tank } = game;
        const tile = board[to.y][to.x];
        const background = GameObject.getBackground(tile);
        game.prevTank = { ...tank };
        if (isAvailable(to, game.board)) {
            tank.x = to.x;
            tank.y = to.y;
            game.rendering = true;
            if (tile.background === GameBackgrounds.TUNNEL) {
                background.handleTankMove(game);
            }
            GameObject.checkFire(game);
            if (game.status !== 'FAIL') {
                if (handle) {
                    background.handleTank(game, true);
                } else if (!inSkipping) {
                    background.skipTank(game);
                }
            } 
        }
    }

    static getObstacleCss(tile: Tile) {
        return this.getObstacle(tile)?.css;
    }

    static getBackgroundCss(tile: Tile) {
        return this.getBackground(tile)?.css;
    }

    css = '';

    handleLeaving(game: GameState, position: Position) {};

    pending(game: GameState, from: Position, to: Position, beforeCheckPending: boolean) {
        game.pending.push({ from, to });
    }
}

class GameObstacle extends GameObject {
    handleLaser(game: GameState, position: Position) {
        game.laser = null;
    }

    sawTank(game: GameState, position: Position): boolean {
        // false means current obstacle already blocked further obstacles seeing tank
        return false;
    }

    skipLaser(game: GameState) {}

    handleMove(game: GameState, from: Position, to: Position | null, beforeCheckPending: boolean) {
        const { board, pending } = game;
        const fromTile = board[from.y][from.x];
        if (!to) {
            to = nextPosition(from);
        }
        const index = pending.findIndex((p) => {
            return sameCoord(p.to, from);
        });
        if (index > -1) {
            pending.splice(index, 1);
        }
        if (fromTile.object && isAvailable(to, board)) {
            const targetTile = get(board, [to.y, to.x]);
            targetTile.object = fromTile.object;
            delete fromTile.object;

            // if (game.laser && sameCoord(from, game.laser)) {
            //     GameObject.getObstacle(targetTile)?.skipLaser(game);
            // }

            if (targetTile.background === GameBackgrounds.TUNNEL) {
                GameObject.handlePending(game, from, to);
            } else {
                GameObject.getBackground(targetTile).pending(game, from, to, beforeCheckPending);
            }
        }
    }
}

class Bricks extends GameObstacle {
    css = 'BRICKS';

    handleLaser(game: GameState, position: Position) {
        super.handleLaser(game, position);
        delete game.board[position.y][position.x].object;
    };
}

class SolidBlock extends GameObstacle {
    css = 'SOLID_BLOCK';
}

class MovableBlock extends GameObstacle {
    css = 'MOVABLE_BLOCK';

    handleLaser(game: GameState, position: Position) {
        super.handleLaser(game, position);
        this.handleMove(game, position, null, true);
    }
}

class AntiTankN extends GameObstacle {
    css = 'ANTI_TANK_N';
    dead = GameObstacles.ANTI_TANK_DEAD_N;
    dead_direction: DIRECTION = CMD.DOWN;

    handleLaser(game: GameState, position: Position) {
        super.handleLaser(game, position);
        if (position.direction === this.dead_direction) {
            game.board[position.y][position.x].object = this.dead;
        } else {
            this.handleMove(game, position, null, true);
        }
    }

    sawTank(game: GameState, position: Position): boolean {
        const { tank } = game;
        const direction = reverseDirection(this.dead_direction);
        if (getDirection(position, tank) === direction) {
            fireLasert(game, nextPosition({ ...position, direction, }));
        }
        return super.sawTank(game, position);
    }
}

class AntiTankS extends AntiTankN {
    css = 'ANTI_TANK_S';
    dead = GameObstacles.ANTI_TANK_DEAD_S;
    dead_direction: DIRECTION = CMD.UP;
}

class AntiTankE extends AntiTankN {
    css = 'ANTI_TANK_E';
    dead = GameObstacles.ANTI_TANK_DEAD_E;
    dead_direction: DIRECTION = CMD.LEFT;
}

class AntiTankW extends AntiTankN {
    css = 'ANTI_TANK_W';
    dead = GameObstacles.ANTI_TANK_DEAD_W;
    dead_direction: DIRECTION = CMD.RIGHT;
}

class AntiTankDeadN extends GameObstacle {
    css = 'ANTI_TANK_DEAD_N';

    handleLaser(game: GameState, position: Position) {
        super.handleLaser(game, position);
        this.handleMove(game, position, position, true);
    }
}

class AntiTankDeadS extends AntiTankDeadN {
    css = 'ANTI_TANK_DEAD_S';
}

class AntiTankDeadW extends AntiTankDeadN {
    css = 'ANTI_TANK_DEAD_W';
}

class AntiTankDeadE extends AntiTankDeadN {
    css = 'ANTI_TANK_DEAD_E';
}

class MirrorNW extends GameObstacle {
    css = 'MIRROR_NW';
    directions: DIRECTION[] = [CMD.UP, CMD.LEFT];
    handleLaser(game: GameState, position: Position) {
        super.handleLaser(game, position);
        const index = this.directions.indexOf(position.direction);
        if (index !== -1) {
            this.hitBack(game, position);
        } else {
            this.hitMirror(game, position);
        }
    }

    getFireDirections(): DIRECTION[] {
        return [
            reverseDirection(this.directions[0]),
            reverseDirection(this.directions[1]),
        ]
    }

    hitBack(game: GameState, position: Position) {
        this.handleMove(game, position, null, true);
    }

    hitMirror(game: GameState, position: Position) {
        const isMoving = game.pending.find(({ from, to }) => {
            return sameCoord(to, position);
        });
        const fire_directions = this.getFireDirections()
        const direction =  this.directions[1 - fire_directions.indexOf(position.direction)];
        fireLasert(game, {
            ...position,
            direction
        }, true);
        if (isMoving && 
            [GameBackgrounds.ICE, GameBackgrounds.THIN_ICE].includes(
                game.board[position.y][position.x].background
            )
        ) {
            GameObject.checkLaser(game);
        }
    }

    // skipLaser(game: GameState) {
    //     // TODO: tmp hack, should move this logic to mirror and anti-tank
    //     game.laser = {
    //         ...to,
    //         direction: game.laser.direction
    //     };
    // }
}

class MirrorNE extends MirrorNW {
    css = 'MIRROR_NE';
    directions: DIRECTION[] = [CMD.UP, CMD.RIGHT];
}

class MirrorSE extends MirrorNW {
    css = 'MIRROR_SE';
    directions: DIRECTION[] = [CMD.DOWN, CMD.RIGHT];
}

class MirrorSW extends MirrorNW {
    css = 'MIRROR_SW';
    directions: DIRECTION[] = [CMD.DOWN, CMD.LEFT];
}

class RotaryMirrorNW extends MirrorNW {
    css = 'ROTARY_MIRROR_NW';
    directions: DIRECTION[] = [CMD.UP, CMD.LEFT];
    next_direction = GameObstacles.ROTARY_MIRROR_NE;

    hitBack(game: GameState, position: Position) {
        
        game.board[position.y][position.x].object = this.next_direction;
    }
}

class RotaryMirrorNE extends RotaryMirrorNW {
    css = 'ROTARY_MIRROR_NE';
    directions: DIRECTION[] = [CMD.UP, CMD.RIGHT];
    next_direction = GameObstacles.ROTARY_MIRROR_SE;
}

class RotaryMirrorSE extends RotaryMirrorNW {
    css = 'ROTARY_MIRROR_SE';
    directions: DIRECTION[] = [CMD.DOWN, CMD.RIGHT];
    next_direction = GameObstacles.ROTARY_MIRROR_SW;
}

class RotaryMirrorSW extends RotaryMirrorNW {
    css = 'ROTARY_MIRROR_SW';
    directions: DIRECTION[] = [CMD.DOWN, CMD.LEFT];
    next_direction = GameObstacles.ROTARY_MIRROR_NW;
}

class CrystalBlock extends GameObstacle {
    css = 'CRYSTAL_BLOCK';
    handleLaser(game: GameState, position: Position) { }
}

class GameBackground extends GameObject {
    handleLanding(game: GameState, from: Position, to: Position) {}
    handleTank(game: GameState, inSkipping: boolean) {}
    handleTankMove(game: GameState) {}
    skipTank(game: GameState) {}
    cleanUp(game: GameState, position: Position) {}
    shouldSkip(game: GameState, position: Position): boolean {
        return false;
    }
    shouldCheckTank(game: GameState, prevBoard: Board) {
        return true;
    }
}

class Dirt extends GameBackground {
    css = 'DIRT';
}

class MovableBlockWater extends GameBackground {
    css = 'MOVABLE_BLOCK_WATER';
}

const sameKindTunnel = (t1: Tile, t2: Tile) => {
    return t1.background === GameBackgrounds.TUNNEL && t2.background === GameBackgrounds.TUNNEL && t1.color === t2.color;
}

class Tunnel extends GameBackground {
    css = 'TUNNEL';

    handleLanding(game: GameState, from: Position, to: Position) {
        super.handleLanding(game, from, to);
        const { board } = game;
        const tunnel = board[to.y][to.x];
        let pendingTunnel = true;
        each(board, (row, y) => {
            each(row, (tile, x) => {
                if (
                    sameKindTunnel(tile, tunnel) && 
                    !sameCoord(to, {x, y, direction: CMD.UP}) &&
                    !tile.object
                ) {
                    tile.object = tunnel.object;
                    delete tunnel.object;
                    pendingTunnel = false;
                    return pendingTunnel;
                }
            });
            return pendingTunnel;
        });
        if (pendingTunnel) {
            game.pendingTunnels.push({
                ...to,
                direction: CMD.UP // TODO: use UP to indicate pending obstacle for now, should refactoring this
            });
        }
    }

    handleTankMove(game: GameState) {
        super.handleTankMove(game);
        const { board, tank } = game;
        const tunnel = board[tank.y][tank.x];
        let pendingTunnel = true;
        each(board, (row, y) => {
            each(row, (tile, x) => {
                if (
                    sameKindTunnel(tile, tunnel) && 
                    !sameCoord(tank, {x, y, direction: CMD.UP}) &&
                    !tile.object
                ) {
                    tank.x = x;
                    tank.y = y;
                    pendingTunnel = false;
                    return pendingTunnel;
                }
            });
            return pendingTunnel;
        });
        if (pendingTunnel) {
            game.pendingTunnels.push({ 
                ...tank,
                direction: CMD.DOWN // TODO: use DOWN to indicate pending tank for now, should refactoring this
            });
        }
    }

    handleLeaving(game: GameState, position: Position) { 
        super.handleLeaving(game, position);
        const { board, tank, pendingTunnels } = game;
        const obstacleIndex = findIndex(pendingTunnels, ({ x, y, direction }) => {
            return sameKindTunnel(board[y][x], board[position.y][position.x]) && direction === CMD.UP;
        });
        const tankIndex = findIndex(pendingTunnels, ({ x, y, direction }) => {
            return sameKindTunnel(board[y][x], board[position.y][position.x]) && direction === CMD.DOWN;
        });
        if (obstacleIndex > -1) {
            const pending = pendingTunnels.splice(obstacleIndex, 1)[0];
            if (!sameCoord(pending, position)) {
                const pedningTile = board[pending.y][pending.x];
                if (pedningTile.object) {
                    const targetTile = get(board, [position.y, position.x]);
                    targetTile.object = pedningTile.object;
                    delete pedningTile.object;
                }
            }
        } else if (tankIndex > -1) {
            const pending = pendingTunnels.splice(tankIndex, 1)[0];
            if (!sameCoord(pending, position) && sameCoord(tank, pending)) {
                if (isAvailable(position, game.board)) {
                    tank.x = position.x;
                    tank.y = position.y;
                    game.rendering = true;
                }
            }
        }
    }
}

class Flag extends GameBackground {
    css = 'FLAG';

    handleTank(game: GameState, inSkipping: boolean) {
        super.handleTank(game, inSkipping);
        game.status = "WIN";
    }

    skipTank(game: GameState) {
        game.status = "WIN";
    }
}

class Water extends GameBackground {
    css = 'WATER';

    handleLanding(game: GameState, from: Position, to: Position) {
        super.handleLanding(game, from, to);
        const { board } = game;
        const tile = board[to.y][to.x];
        if (tile.object === GameObstacles.MOVABLE_BLOCK) {
            tile.background = GameBackgrounds.MOVABLE_BLOCK_WATER;
        }
        delete tile.object;
    };

    handleTank(game: GameState, inSkipping: boolean) {
        super.handleTank(game, inSkipping);
        game.status = 'FAIL';
    }

    pending(game: GameState, from: Position, to: Position, beforeCheckPending: boolean) {
        super.pending(game, from, to, beforeCheckPending);
        this.handleLanding(game, from, to);
    }

    skipTank(game: GameState) {
        const { board, prevTank } = game;
        const prevTile = board[prevTank.y][prevTank.x];
        if (prevTile.background === GameBackgrounds.ICE) {
            this.handleTank(game, true);
        }
    }
}

class Ice extends GameBackground {
    css = 'ICE';

    handleLanding(game: GameState, from: Position, to: Position) {
        super.handleLanding(game, from, to);
        const target = this.getNextTarget(game, from, to, true);
        if (target) {
            GameObject.getObstacle(game.board[to.y][to.x])?.handleMove(game, to, target, false);
        }
    }

    handleTank(game: GameState, inSkipping: boolean) {
        super.handleTank(game, inSkipping);
        const { tank, prevTank } = game;
        const direction = getDirection(prevTank, tank);
        if (direction) {
            GameObject.moveTank(game, nextPosition({
                ...tank,
                direction,
            }), false, false);
        }
    }

    pending(game: GameState, from: Position, to: Position, beforeCheckPending: boolean) {
        if (!beforeCheckPending || this.shouldPending(game, from, to)) {
            super.pending(game, from, to, beforeCheckPending);
        }
    }

    shouldPending(game: GameState, from: Position, to: Position): boolean {
        return !!this.getNextTarget(game, from, to, false);
    }

    getNextTarget(game: GameState, from: Position, to: Position, checkTank: boolean): Position | null {
        const direction = getDirection(from, to);
        if (direction) {
            const target = nextPosition({ ...to, direction, });
            if ((!checkTank || !sameCoord(game.tank, target)) && isAvailable(target, game.board)) {
                return target;
            }
        }
        return null;
    }

    shouldSkip(game: GameState, position: Position): boolean {
        const tile = get(game.board, [position.y, position.x])
        const background = GameObject.getBackground(tile);
        return !Boolean(tile.object) && !(background instanceof Ice);
    }

    shouldCheckTank(game: GameState, prevBoard: Board) {
        const { tank } = game;
        return !prevBoard[tank.y][tank.x].object;
    }
}

class ThinIce extends Ice {
    css = 'THIN_ICE';

    handleLanding(game: GameState, from: Position, to: Position) {
        super.handleLanding(game, from, to);
        const tile = game.board[to.y][to.x];
        if (tile.object) {
            // TODO: this doesn't make much sense, should handle this in cleanUp. this is for tutor.lvl 68
            new Water().handleLanding(game, to, to);
        }
        game.cleanUp.push(to);
    }

    cleanUp(game: GameState, position: Position) {
        game.board[position.y][position.x].background = GameBackgrounds.WATER
    }

    shouldPending(game: GameState, from: Position, to: Position) {
        return true;
    }

    handleTank(game: GameState, inSkipping: boolean) {
        const { tank, board } = game;
        const position = { ...tank };
        const tile = board[position.y][position.x];
        super.handleTank(game, inSkipping);
        tile.background = GameBackgrounds.WATER;
        if (sameCoord(position, game.tank)) {
            GameObject.getBackground(tile).handleTank(game, inSkipping);
        }
    }
}

class TankMoverN extends GameBackground {
    css = 'TANK_MOVER_N';
    direction: DIRECTION = CMD.UP;

    handleTank(game: GameState, inSkipping: boolean) {
        super.handleTank(game, inSkipping);
        GameObject.moveTank(game, nextPosition({ ...game.tank, direction: this.direction }), false, true);
    }

    skipTank(game: GameState) {
        GameObject.moveTank(game, nextPosition({ ...game.tank, direction: this.direction }), false, true);
    }

    shouldSkip(game: GameState, position: Position): boolean {
        const tile = get(game.board, [position.y, position.x]);
        const background = GameObject.getBackground(tile);
        return !Boolean(tile.object) && !(background instanceof TankMoverN);
    }

    shouldCheckTank(game: GameState, prevBoard: Board) {
        const { board, tank } = game;
        return !board[tank.y][tank.x].object;
    }
}

class TankMoverS extends TankMoverN {
    css = 'TANK_MOVER_S';
    direction: DIRECTION = CMD.DOWN;
}

class TankMoverW extends TankMoverN {
    css = 'TANK_MOVER_W';
    direction: DIRECTION = CMD.LEFT;
}

class TankMoverE extends TankMoverN {
    css = 'TANK_MOVER_E';
    direction: DIRECTION = CMD.RIGHT;
}
