import { map } from 'lodash';
import gameSlice, { CMD, FIRE_DIRECTION, RecordCMD, initialState, isDirection, DIRECTION } from './game';
import levelsJson from './__fixtures__/levels.json';

const { reducer, actions } = gameSlice;
const { loadLevels, loadLevel, fireTank, moveTank, renderFrame } = actions;

describe('tiles test', () => {
    test('TankMover', () => {

        let state = reducer(initialState, loadLevels({
            levels: levelsJson,
            levelIndex: 0
        }));

        map([
            'W2EEE',
            'EE3N0NSSNNEE',
            'EEWWEE',
            'NN',
            'NN',
            'NNNNNN',
            'N0N',
            'NNSS',
            'NS1WWE3NNEE',
            'NS1EENNEEE',
            'S1NN0N0N0N0N0N0N',
            'S1E3N0NNNN',
            'S11SSN0SS',
            'NSS',
            '00000W22222S1111EES111111NNEE',
            '0WE3S1W2WW',
            'WW2NNNNN',
        ], (records, i) => {
            console.log(`${i + 1}: ${state.levels[i].levelName}`);
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
            state = reducer(state, loadLevel(i + 1));
        });
    });
});
