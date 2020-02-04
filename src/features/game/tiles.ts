import { get, each, findIndex } from 'lodash';
import {  GameState, DIRECTION, BOARD_SIZE } from './game';

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
    SOLID_BLOCK,
    CRYSTAL_BLOCK,
    MOVABLE_BLOCK,
    ANTI_TANK_N,
    ANTI_TANK_S,
    ANTI_TANK_W,
    ANTI_TANK_E,
    ANTI_TANK_DEAD_N,
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

export const sameCoord = (p1: Position, p2: Position): boolean => {
    return p1.x === p2.x && p1.y === p2.y; 
}

// get direction of p2 relative to p1
export const getDirection = (p1: Position, p2: Position): DIRECTION | null => {
    if (p1.x !== p2.x || p1.y !== p2.y) {
        if (p1.x === p2.x) {
            return p1.y > p2.y ? 'N': 'S';
        } else if (p1.y === p2.y) {
            return p1.x > p2.x ? 'W': 'E';
        }
    }
    return null;
} 

const reverseDirection = (direction: DIRECTION): DIRECTION => {
    const reverseMap: {[key: string]: DIRECTION} = {N: 'S', S: 'N', W: 'E', E: 'W'};
    return reverseMap[direction];
}

const fireLasert = (game: GameState, laser: Position, force: boolean = false) => {
    if (game.laser === null || force) {
        game.laser = laser;
        game.laserCount = 0;
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

export const isAvailable = (position: Position, board: Board): boolean => {
    const { x, y } = position;
    const target = get(board, `${y}.${x}`);
    return !!(target && !target.object);
}

export const nextPosition = (position: Position) => {
    const { x, y, direction } = position;
    return {
        'N': { x, y: y - 1, direction },
        'S': { x, y: y + 1, direction },
        'E': { x: x + 1, y, direction },
        'W': { x: x - 1, y, direction },
    }[direction];
}

export interface Tile {
    background: GameBackgrounds,
    color?: string,
    object?: GameObstacles,
};

export type Board = Tile[][]; 

export interface Position {
    x: number,
    y: number,
    direction: DIRECTION,
}


export class GameObject {
    static getBackground(tile: Tile): GameBackground {
        return new ({
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
        }[tile.background])();
    }

    static getObstacle(tile: Tile): GameObstacle | null {
        return !tile.object ? null : new ({
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
        }[tile.object])();
    }

    static handleMove(game: GameState, from: Position, to: Position){
        const { board } = game;
        const toTile = get(board, [to.y, to.x]);
        if (toTile) {
            this.getBackground(toTile).handleMove(game, to);
            const fromTile = get(board, [from.y, from.x]);
            if (!fromTile?.object) {
                this.getBackground(fromTile).handleEmpty(game, from);
            }
        }
    };

    static handleFire(game: GameState, position: Position) {
        const tile = get(game.board, [position.y, position.x]);
        if (tile) {
            this.getObstacle(tile)?.handleFire(game, position);
        }
    }

    static checkTank(game: GameState, inSkipping: boolean = false) {
        const { board, tank } = game;
        if (!board[tank.y][tank.x].object) {
            each(['E', 'S', 'W', 'N'], (direction: DIRECTION) => {
                forEachTile(board, { ...tank, direction }, (tile, current) => {
                    return this.getObstacle(tile)?.checkTank(game, current);
                });
            });
            this.getBackground(board[tank.y][tank.x]).handleTank(game, inSkipping);
        }
    };

    static getObstacleCss(tile: Tile) {
        return this.getObstacle(tile)?.css;
    }

    static getBackgroundCss(tile: Tile) {
        return this.getBackground(tile)?.css;
    }

    css = '';

    handleMove(game: GameState, position: Position) {};
    handleEmpty(game: GameState, position: Position) {};
}

class GameObstacle extends GameObject {
    handleFire(game: GameState, position: Position) {
        game.laser = null;
    }

    checkTank(game: GameState, position: Position): boolean {
        // false means current obstacle already blocked further obstacles seeing tank
        return false;
    }
}

class Bricks extends GameObstacle {
    css = 'BRICKS';

    handleFire(game: GameState, position: Position) {
        super.handleFire(game, position);
        delete game.board[position.y][position.x].object;
    };
}

class SolidBlock extends GameObstacle {
    css = 'SOLID_BLOCK';
}

class MovableBlock extends GameObstacle {
    css = 'MOVABLE_BLOCK';

    handleFire(game: GameState, position: Position) {
        super.handleFire(game, position);
        const { board } = game;
        // TODO: merge this with renderFrame
        const from = { ...position };
        const target = nextPosition(from);

        if (isAvailable(target, board)) {
            board[target.y][target.x].object = board[from.y][from.x].object;
            delete board[from.y][from.x].object;
            GameObject.handleMove(game, from, target);
        }
        // TODO: next action actually make more sence, because it keep laser speed
        // game.next.push({
        //     cmd: position.direction,
        //     start: {...position},
        // });
    };
}


class AntiTankN extends GameObstacle {
    css = 'ANTI_TANK_N';
    dead = GameObstacles.ANTI_TANK_DEAD_N;
    dead_direction: DIRECTION = 'S';

    handleFire(game: GameState, position: Position) {
        super.handleFire(game, position);
        if (position.direction === this.dead_direction) {
            game.board[position.y][position.x].object = this.dead;
        } else {
            game.next.push({
                cmd: position.direction,
                start: {...position},
            });
        }
    }

    checkTank(game: GameState, position: Position) {
        const { tank } = game;
        const direction = reverseDirection(this.dead_direction);
        if (getDirection(position, tank) === direction) {
            fireLasert(game, nextPosition({
                ...position,
                direction,
            }));
        }
        return super.checkTank(game, position);
    }
}

class AntiTankS extends AntiTankN {
    css = 'ANTI_TANK_S';
    dead = GameObstacles.ANTI_TANK_DEAD_S;
    dead_direction: DIRECTION = 'N';
}

class AntiTankE extends AntiTankN {
    css = 'ANTI_TANK_E';
    dead = GameObstacles.ANTI_TANK_DEAD_E;
    dead_direction: DIRECTION = 'W';
}

class AntiTankW extends AntiTankN {
    css = 'ANTI_TANK_W';
    dead = GameObstacles.ANTI_TANK_DEAD_W;
    dead_direction: DIRECTION = 'E';
}

class AntiTankDeadN extends GameObstacle {
    css = 'ANTI_TANK_DEAD_N';
}

class AntiTankDeadS extends GameObstacle {
    css = 'ANTI_TANK_DEAD_S';
}

class AntiTankDeadW extends GameObstacle {
    css = 'ANTI_TANK_DEAD_W';
}

class AntiTankDeadE extends GameObstacle {
    css = 'ANTI_TANK_DEAD_E';
}

class MirrorNW extends GameObstacle {
    css = 'MIRROR_NW';
    directions: DIRECTION[] = ['N', 'W'];
    handleFire(game: GameState, position: Position) {
        super.handleFire(game, position);
        const index = this.directions.indexOf(position.direction);
        if (index !== -1) {
            this.hitBack(game, position);
        } else {
            this.hitMirror(game, position);
        }
    }

    getFireDirections(): DIRECTION[] {
        const directionMap: {[key: string]: DIRECTION} = {
            'N': 'S', 'S': 'N', 'W': 'E', 'E': 'W'
        };
        return [
            directionMap[this.directions[0]],
            directionMap[this.directions[1]],
        ]
    }

    hitBack(game: GameState, position: Position) {
        game.next.push({
            cmd: position.direction,
            start: {...position},
        });
    }

    hitMirror(game: GameState, position: Position) {
        const fire_directions = this.getFireDirections()
        const direction =  this.directions[1 - fire_directions.indexOf(position.direction)];
        fireLasert(game, {
            ...position,
            direction
        }, true);
    }
}

class MirrorNE extends MirrorNW {
    css = 'MIRROR_NE';
    directions: DIRECTION[] = ['N', 'E'];
}

class MirrorSE extends MirrorNW {
    css = 'MIRROR_SE';
    directions: DIRECTION[] = ['S', 'E'];
}

class MirrorSW extends MirrorNW {
    css = 'MIRROR_SW';
    directions: DIRECTION[] = ['S', 'W'];
}

class RotaryMirrorNW extends MirrorNW {
    css = 'ROTARY_MIRROR_NW';
    directions: DIRECTION[] = ['N', 'W'];
    next_direction = GameObstacles.ROTARY_MIRROR_NE;

    hitBack(game: GameState, position: Position) {
        
        game.board[position.y][position.x].object = this.next_direction;
    }
}

class RotaryMirrorNE extends RotaryMirrorNW {
    css = 'ROTARY_MIRROR_NE';
    directions: DIRECTION[] = ['N', 'E'];
    next_direction = GameObstacles.ROTARY_MIRROR_SE;
}

class RotaryMirrorSE extends RotaryMirrorNW {
    css = 'ROTARY_MIRROR_SE';
    directions: DIRECTION[] = ['S', 'E'];
    next_direction = GameObstacles.ROTARY_MIRROR_SW;
}

class RotaryMirrorSW extends RotaryMirrorNW {
    css = 'ROTARY_MIRROR_SW';
    directions: DIRECTION[] = ['S', 'W'];
    next_direction = GameObstacles.ROTARY_MIRROR_NW;
}

class CrystalBlock extends GameObstacle {
    css = 'CRYSTAL_BLOCK';
    handleFire(game: GameState, position: Position) { }
}

class GameBackground extends GameObject {
    handleTank(game: GameState, inSkipping: boolean) {}
    shouldSkip(game: GameState) {
        return false;
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

    handleMove(game: GameState, position: Position) {
        const { board, tank, pendingTunnels } = game;
        const tunnel = board[position.y][position.x];
        const haveTank = sameCoord(position, tank);
        let pending = true;
        each(board, (row, y) => {
            each(row, (tile, x) => {
                if (
                    sameKindTunnel(tile, tunnel) && 
                    !sameCoord(position, {x, y, direction: 'N'}) &&
                    !tile.object
                ) {
                    if (tunnel.object) {
                        tile.object = tunnel.object;
                        delete tunnel.object;
                        pending = false;
                    } else if (haveTank) {
                        tank.x = x;
                        tank.y = y;
                        pending = false;
                    }
                    return pending;
                }
            });
            return pending;
        });
        if (pending) {
            pendingTunnels.push({...position});
        }
    }

    handleEmpty(game: GameState, position: Position) { 
        super.handleEmpty(game, position);
        const { board, pendingTunnels } = game;
        const index = findIndex(pendingTunnels, ({ x, y }) => {
            return sameKindTunnel(board[y][x], board[position.y][position.x]);
        });
        if (index > -1) {
            const pending = pendingTunnels.splice(index, 1)[0];
            if (!sameCoord(pending, position)) {
                this.handleMove(game, pending);
            }
        }
    }
}

class Flag extends GameBackground {
    css = 'FLAG';

    handleMove(game: GameState, position: Position) {
        const { tank } = game;
        if (tank.x === position.x && tank.y === position.y) {
            game.status = "WIN";
        }
    };
}

class Water extends GameBackground {
    css = 'WATER';

    handleMove(game: GameState, position: Position) {
        const { board, tank } = game;
        const { x, y } = position;
        const tile = board[y][x];
        if (tile.object === GameObstacles.MOVABLE_BLOCK) {
            tile.background = GameBackgrounds.MOVABLE_BLOCK_WATER;
        }
        delete tile.object;
        if (tank.x === x && tank.y === y) {
            game.status = 'FAIL';
        }
    };
}

class Ice extends GameBackground {
    css = 'ICE';

    handleMove(game: GameState, position: Position) {
        const { tank, board } = game;
        const { x, y } = position;
        const target = nextPosition(position);
        // TODO: hack for skipping issue, should make this configurable
        if (tank.x === x && tank.y === y && isAvailable(target, board) && this.shouldSkip(game)) {
                game.prevTank = { ...tank };
                tank.x = target.x;
                tank.y = target.y;
                GameObject.handleMove(game, game.prevTank, target);
                GameObject.checkTank(game, false);
        } else {
            // TODO: need handle tank skipping. Does obstacle has skipping issue ?
            game.next.push({
                cmd: position.direction,
                start: {...position},
            });
        }
    }

    shouldSkip(game: GameState) {
        const { board, prevTank } = game;
        const prevBackground = GameObject.getBackground(get(board, [prevTank.y, prevTank.x]));
        return !(prevBackground instanceof Ice) && !(prevBackground instanceof TankMoverN);
    }
}

class ThinIce extends Ice {
    css = 'THIN_ICE';

    handleMove(game: GameState, position: Position) {
        super.handleMove(game, position);
        game.board[position.y][position.x].background = GameBackgrounds.WATER;
    }
}

class TankMoverN extends GameObject {
    css = 'TANK_MOVER_N';
    direction: DIRECTION = 'N';

    handleTank(game: GameState, inSkipping: boolean) {
        const { tank } = game;
        const { x, y } = tank;
        const target = nextPosition({ x, y, direction: this.direction });
        if (tank.x === x && tank.y === y && isAvailable(target, game.board)) {
            if (!inSkipping && this.shouldSkip(game)) {
                game.prevTank = { ...tank };
                tank.x = target.x;
                tank.y = target.y;
                GameObject.handleMove(game, game.prevTank, target);
                GameObject.checkTank(game, true);
            } else {
                game.next.push({
                    cmd: this.direction,
                    start: {...tank},
                });
            }
        }
    }

    shouldSkip(game: GameState) {
        const { board, prevTank, tank } = game;
        const prevBackground = GameObject.getBackground(get(board, [prevTank.y, prevTank.x]));
        return sameCoord(prevTank, tank) || !(prevBackground instanceof TankMoverN);
    }
}

class TankMoverS extends TankMoverN {
    css = 'TANK_MOVER_S';
    direction: DIRECTION = 'S';
}

class TankMoverW extends TankMoverN {
    css = 'TANK_MOVER_W';
    direction: DIRECTION = 'W';
}

class TankMoverE extends TankMoverN {
    css = 'TANK_MOVER_E';
    direction: DIRECTION = 'E';
}
