import { map } from 'lodash';
import gameSlice, { initialState, isDirection, BoardCMD, GameState, db } from './game';
import levelsJson from '../../../__fixtures__/levels.json';

const { reducer, actions } = gameSlice;
const { loadLevels, loadLevel, fireTank, moveTank, renderFrame } = actions;

const testLevels = (tests: any[][], state: GameState) => {
    map(tests, ([records, result, coord], i: number) => {
        const level = i % db.levels.length;
        if (records) {
            map(Array.from(records), (cmd: BoardCMD) => {
                if (isDirection(cmd)) {
                    state = reducer(state, moveTank(cmd));
                } else {
                    state = reducer(state, fireTank());
                }
                while (state.rendering && state.status === 'PLAYING') {
                    state = reducer(state, renderFrame());
                }
            });
            test(
                `${level + 1}: ${db.levels[level].levelName} ${records}`, 
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
        state = reducer(state, loadLevel((level + 1) % db.levels.length));
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
            'W EEE',        //  
            'EE N NSSNNEE',
            'EEWWEE',
            'NN',
            'NN',
            'NNNNNN',
            'N N',
            'NNSS',
            'NS WWE NNEE',
            'NS EENNEEE',
            'S NN N N N N N N', //   
            'S E N NNNN',
            'S  SSN SS',
            'NSS',
            '     W     S    EES      NNEE',
            ' WE S W WW',
            'WW NNNNN',
            'WWNNWWNNWWNNWWNNWWNNWWNNW WNN',
            'WW NNNN EESS',
            'WW NNNNEEE',
            'NE  EESSEE',   //   
            'EENNNNWWNNN',
            'EEEEEEEENNNNNNNNNNNNWWWNN',
            'W NN',
            'WWSN   SSEE',
            '  EEEN EEN NNEEN WWSSSSEEN   WWWN   WWWNNN NNNEE',
            '',
            'EENNNNEE',
            ' NEE',
            ' N  EEE',
            ' W E NNWWW',
            'E NNSS',
            'E W NNN',
            'E W NNWW',
            'S SEENNWW',
            'S SEESSWW', 
            'W NE    WWEEWW',
            'EENNEE',
            ' W WEEW WWWSS',
            '  N  NN',  // 4 
            'EEENN',
            'N NNWW WWSSSEE',
            'EEES WW',
            ' WWNNSS',
            ' WWW',
            ' NN  N',
            ' NWWWWW N NSSNNN',
            'E SSSS',
            'NNWWS SEESSW   WWWWS W SSN NS W SSN NS W SSN NS W SSN NS W SSN NS W SSN NS EEEESS',
            'W NNN',
            'W SSWWWEESS',
            'W SS EESS',
            'NW SS',
            ' WW',
            'W NNWWW NNS WW',
            'W NNNWWWEENNEES SS',
            'WWWNNNN', // multiple solutions
            'NNNNWWWWS W W', // multiple solutions
            'WWSSWWWWWWNNNNEEEEEESSS',
            'EENNNEESS',
            'EEESSEENN',
            'SSWWNN',
            'W  E WWNN',
            'EEN WWSSNN',
            'NWWS EESSSW  NNEESSWW',
            'E ESS N N',
            'E EESS E N EE',
            'WWN NEEE EE',
            'SSSSSSE ES WWSSSE  NNNNNEES   SSWWSSSE  SSSEEEEEENNW SSEEENNW  WNNNNW SSSSSWWWWWWWNNNNNNEES  SWWSSSE  SSSEEEEN EEENNW WSSWWWWNNNNNNNNNEEES SW NNWWWWSSSEEN  SSSSSSSEEEN WWWNNE NNNNNNNNEEES SE NNWWWWNNE        SSSSSSSSSSEEEEN NEEEN  WWWWWNNNNNNNNEEES NNE     EEEESSSW NNWWWWWWWSSSSSEEEEEN  WWWWWNNNNNNEEEE   EEE   EEEEE',
            '',
            'NS SW SSEESS',
            'SSS',
            ' WWWN  WWWNNNE  NNE NNE   NNSSSSSSSEESSSSWW',
            'S W SSS',
            'EESSS', // multiple solutions
            'SSEEEEEEEEENNNW   SSSWWWWWWWWWNNNN',
            'EEENNW WSSSW    NNNNW SSW WWSSSN WW', // multiple solutions
            'SSWWWWWWWWWNNNNNNNEEE',
            'NNNNNWWEEE', // multiple solutions
            'EEEEEEEEENNNWWS  SSWWWWWSSWW',
            'SSN NNEESSSWWWNNWW',
            'SSN NNEENNNNNNNWWWSSSWW',
            'SSN NNEENNNNWWWWSSS',
            'SSN NNEENNNNWWWSSSWW',
            ' E EN WWW  N  NNEE',
            'SSWWWNNE SSEEEN    WWN EENNNNN',
            'NNNNWWWWSSSW NNNEEEESSSSSWWEE',
            'WWWWS   EEEESSWW',
            'NNNNEEEEEEEEEEESSSSSWW WW',
            'NEEENNEEENNEEEEWWWWWWWWWWWW',
            'WWS WWNN',
            'NNNNNNEE',
        ], (records, i) => {
            // console.log(`${i + 1}: ${state.levels[i].levelName}`);
            if (records) {
                map(Array.from(records), (cmd: BoardCMD) => {
                    if (isDirection(cmd)) {
                        state = reducer(state, moveTank(cmd));
                    } else {
                        state = reducer(state, fireTank());
                    }
                    while (state.rendering && state.status === 'PLAYING') {
                        state = reducer(state, renderFrame());
                    }
                    // console.log(`${cmd}: `, state.tank);
                });
                expect(state.status).toBe('WIN');
            } else {
                // console.log(`skip: ${i + 1} ${state.levels[i].levelName}`);
            }
            state = reducer(state, loadLevel(i + 1));
        });
    });
});
