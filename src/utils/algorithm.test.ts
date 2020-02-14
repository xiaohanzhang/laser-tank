import { get, each, toInteger } from 'lodash';
import { aStar } from './algorithm';

describe('A* test', () => {
    interface Coordinate {
        x: number,
        y: number,
    }
    const board = [
        ['', '', '', ''],
        ['*', '', '', ''],
        ['', '', '*', '*'],
        ['', '*', '', '?'],
        ['', '', '', ''],
    ];
    const width = 4;
    const toId = ({x, y}: Coordinate) => {
        return (y * width + x).toString();
    };
    const hScore = (from: Coordinate, to: Coordinate): number => {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    }
    test('find path', () => {
        const start = {x: 0, y: 0};
        const goal = {x: 3, y: 3};
        const path = aStar(toId(start), toId(goal), hScore(start, goal), (current, callback) => {
            const value = toInteger(current);
            const x = value % width;
            const y = Math.floor(value/width);

            each([{x, y: y - 1}, {x: x + 1, y}, {x, y: y + 1}, {x: x - 1, y}], (neighbor) => {
                if (['', '?'].includes(get(board, [neighbor.y, neighbor.x]))) {
                    callback(toId(neighbor), 1, hScore(neighbor, goal));
                }
            });
        });
        expect(path).toEqual(['0', '1', '5', '9', '8', '12', '16', '17', '18', '14', '15']);
    });

    test('no path', () => {
        const start = {x: 0, y: 0};
        const goal = {x: 3, y: 3};
        const path = aStar(toId(start), toId(goal), hScore(start, goal), (current, callback) => {
            const value = toInteger(current);
            const x = value % width;
            const y = Math.floor(value/width);

            each([{x, y: y - 1}, {x: x + 1, y}, {x, y: y + 1}, {x: x - 1, y}], (neighbor) => {
                if (['',].includes(get(board, [neighbor.y, neighbor.x]))) {
                    callback(toId(neighbor), 1, hScore(neighbor, goal));
                }
            });
        });
        expect(path).toBe(false);
    });

});

