import { GameBackgrounds, GameObstacles } from './tiles';

export const saveDataMap: {[key: number]: any} = {
    0: {
        background: GameBackgrounds.DIRT,
    },
    2: {
        background: GameBackgrounds.FLAG,
    },
    3: {
        background: GameBackgrounds.WATER,
    },
    4: {
        object: GameObstacles.SOLID_BLOCK,
    },
    5: {
        object: GameObstacles.MOVABLE_BLOCK, ///////
    },
    6: {
        object: GameObstacles.BRICKS,
    },
    7: {
        object: GameObstacles.ANTI_TANK_N
    },
    8: {
        object: GameObstacles.ANTI_TANK_E
    },
    9: {
        object: GameObstacles.ANTI_TANK_S
    },
    10: {
        object: GameObstacles.ANTI_TANK_W
    },
    11: {
        object: GameObstacles.MIRROR_NW
    },
    12: {
        object: GameObstacles.MIRROR_NE
    },
    13: {
        object: GameObstacles.MIRROR_SE
    },
    14: {
        object: GameObstacles.MIRROR_SW
    },
    15: {
        background: GameBackgrounds.TANK_MOVER_N
    },
    16: {
        background: GameBackgrounds.TANK_MOVER_E
    },
    17: {
        background: GameBackgrounds.TANK_MOVER_S
    },
    18: {
        background: GameBackgrounds.TANK_MOVER_W
    },
    19: {
        object: GameObstacles.CRYSTAL_BLOCK
    },
    20: {
        object: GameObstacles.ROTARY_MIRROR_NW
    },
    21: {
        object: GameObstacles.ROTARY_MIRROR_NE
    },
    22: {
        object: GameObstacles.ROTARY_MIRROR_SE
    },
    23: {
        object: GameObstacles.ROTARY_MIRROR_SW
    },
    24: {
        background: GameBackgrounds.ICE
    },
    25: {
        background: GameBackgrounds.THIN_ICE,
    },
}
