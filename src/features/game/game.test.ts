import { map } from 'lodash';
import gameSlice, { 
    CMD, FIRE_DIRECTION, RecordCMD, initialState, isDirection, DIRECTION, 
    GameState, Status 
} from './game';
import levelsJson from '../../../__fixtures__/levels.json';

const { reducer, actions } = gameSlice;
const { loadLevels, loadLevel, fireTank, moveTank, renderFrame } = actions;

const testLevels = (tests: any[][], state: GameState) => {
    map(tests, ([records, result, coord], i: number) => {
        const level = i % state.levels.length;
        if (records) {
            let lastDirection = CMD.UP;
            map(Array.from(records), (cmd: RecordCMD) => {
                if (isDirection(cmd)) {
                    state = reducer(state, moveTank(cmd));
                    lastDirection = cmd;
                } else {
                    const fireMap: {[key in FIRE_DIRECTION]: DIRECTION} = {
                        [CMD.FIRE_UP]: CMD.UP,
                        [CMD.FIRE_DOWN]: CMD.DOWN,
                        [CMD.FIRE_LEFT]: CMD.LEFT,
                        [CMD.FIRE_RIGHT]: CMD.RIGHT,
                    };
                    const direction = fireMap[cmd];
                    if (lastDirection !== direction) {
                        state = reducer(state, moveTank(direction));
                        lastDirection = direction;
                    } 
                    state = reducer(state, fireTank());
                }
                while (state.rendering && state.status === 'PLAYING') {
                    state = reducer(state, renderFrame());
                }
            });
            test(
                `${level + 1}: ${state.levels[level].levelName} ${records}`, 
                ((s, r, coord) => {
                    return () => {
                        expect(s.status).toBe(r);
                        if (coord) {
                            expect({x: s.tank.x, y: s.tank.y}).toEqual(coord);
                        }
                    }
                }
            )(state, result, coord));
        }
        state = reducer(state, loadLevel((level + 1) % state.levels.length));
    });
};

describe('Basic rules', () => {
    let state = reducer(initialState, loadLevels({
        levels: [{
            "board": [[64,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[9,16,4,0,16,9,24,4,0,24,9,0,16,4,0,0],[0,0,9,0,16,4,24,9,0,24,4,0,0,9,0,24],[0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,4,0,16,4,0,16,4,0,24,4,0,24],[0,17,17,16,4,0,16,9,0,24,4,0,24,9,0,16],[0,24,0,24,9,0,24,4,0,0,9,0,16,4,0,0],[0,18,0,16,0,0,0,0,0,0,0,0,0,9,0,24],[0,24,15,15,0,0,0,0,0,0,0,0,0,0,0,16],[0,18,4,0,0,0,0,0,0,0,0,0,0,0,9,16],[0,24,0,0,0,0,0,0,0,0,0,0,0,0,9,16],[0,18,24,64,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
            "levelName": "test skip",
            "hint": "",
            "author": "Xiaohan Zhang",
            "scoreDifficulty": 0
        }],
        levelIndex: 0
    }));
    testLevels([
        ['EE', 'FAIL'],
        ['SSSSEE', 'FAIL'],
        ['SSSSSSEE', 'FAIL'],
        ['SSSSSSSSSEE', 'FAIL'],
        ['SSSSSSSSSSSSEEESSSSWWEEEE', 'FAIL', {x: 10, y: 15}],
        ['SSSSSSSSSSSSEEEE', 'PLAYING'],
        ['SSSSSSSSSSSSEEENNNNEE', 'FAIL'],
        ['SSSSSSSSSSSSEEENNNNNNNEE', 'FAIL'],
        ['NN', 'FAIL', {x: 8, y: 2}],
    ], state);
});


describe('tiles test', () => {
    test('TankMover', () => {

        let state = reducer(initialState, loadLevels({
            levels: levelsJson,
            levelIndex: 0
        }));

        map([
            'W2EEE',        // 1
            'EE3N0NSSNNEE',
            'EEWWEE',
            'NN',
            'NN',
            'NNNNNN',
            'N0N',
            'NNSS',
            'NS1WWE3NNEE',
            'NS1EENNEEE',
            'S1NN0N0N0N0N0N0N', // 11
            'S1E3N0NNNN',
            'S11SSN0SS',
            'NSS',
            '00000W22222S1111EES111111NNEE',
            '0WE3S1W2WW',
            'WW2NNNNN',
            'WWNNWWNNWWNNWWNNWWNNWWNNW2WNN',
            'WW2NNNN0EESS',
            'WW2NNNNEEE',
            'NE33EESSEE',   // 21
            'EENNNNWWNNN',
            'EEEEEEEENNNNNNNNNNNNWWWNN',
            'W2NN',
            'WWSN000SSEE',
            '00EEEN0EEN0NNEEN0WWSSSSEEN000WWWN000WWWNNN0NNNEE',
            '',
            'EENNNNEE',
            '0NEE',
            '0N00EEE',
            '0W2E3NNWWW',
            'E3NNSS',
            'E3W2NNN',
            'E3W2NNWW',
            'S1SEENNWW',
            'S1SEENNWW',
            'W2NE3333WWEEWW',
            'EENNEE',
            '0W2WEEW2WWWSS',
            '00N00NN',  // 40
            'EEENN',
            'N0NNWW2WWSSSEE',
            'EEES1WW',
            '0WWNNSS',
            '0WWW',
            '0NN00N',
            '0NWWWWW2N0NSSNNN',
            'E3SSSS',
            'NNWWS1SEESSW222WWWWS1W2SSN0NS1W2SSN0NS1W2SSN0NS1W2SSN0NS1W2SSN0NS1W2SSN0NS1EEEESS',
            'W2NNN',
            'W2SSWWWEESS',
            'W2SS1EESS',
            'NW2SS',
            '0WW',
            'W2NNWWW2NNS1WW',
        ], (records, i) => {
            console.log(`${i + 1}: ${state.levels[i].levelName}`);
            if (records) {
                let lastDirection = CMD.UP;
                map(Array.from(records), (cmd: RecordCMD) => {
                    if (isDirection(cmd)) {
                        state = reducer(state, moveTank(cmd));
                        lastDirection = cmd;
                    } else {
                        const fireMap: {[key in FIRE_DIRECTION]: DIRECTION} = {
                            [CMD.FIRE_UP]: CMD.UP,
                            [CMD.FIRE_DOWN]: CMD.DOWN,
                            [CMD.FIRE_LEFT]: CMD.LEFT,
                            [CMD.FIRE_RIGHT]: CMD.RIGHT,
                        };
                        const direction = fireMap[cmd];
                        if (lastDirection !== direction) {
                            state = reducer(state, moveTank(direction));
                            lastDirection = direction;
                        } 
                        state = reducer(state, fireTank());
                    }
                    while (state.rendering && state.status === 'PLAYING') {
                        state = reducer(state, renderFrame());
                    }
                    console.log(`${cmd}: `, state.tank);
                });
                expect(state.status).toBe('WIN');
            } else {
                console.log(`skip: ${i + 1} ${state.levels[i].levelName}`);
            }
            state = reducer(state, loadLevel(i + 1));
        });
    });
});
