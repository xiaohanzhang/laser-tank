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
