import { map, each } from 'lodash';

const hex = (v: number): string => {
    return (v < 16 ? '0' : '') + v.toString(16);
}

const getPattern = (size: number): [number, number, number] => {
    const n = Math.floor(Math.cbrt(size));
    if (n > 255) {
        return [255, 255, 255];
    }
    size -= n * n * n;
    const pattern: [number, number, number] = [n, n, n];
    if (size === 0) {
        return pattern;
    }
    pattern[0] += 1;
    if (size <= n * n) {
        return pattern;
    }
    pattern[1] += 1;
    if (size <= 2 * n * n + n) {
        return pattern;
    }
    pattern[2] += 1;
    return pattern;
}

export const getColors = (size: number): string[] => {
    const pattern = getPattern(size);

    const rgbs = map(pattern, (p) => {
        const colors = [];
        let color = 0;
        p -= 1;
        if (p > 0) {
            const diff = 255 / p;
            while (color < 255) {
                colors.push(Math.floor(color));
                color += diff;
            }
        }
        colors.push(255);
        return colors;
    });

    const results: string[] = [];
    // const available = rgbs[0].length * rgbs[1].length * rgbs[2].length;
    // const redundant = Math.ceil(available / (available - size + 1));
    // let count = 0;
    each(rgbs[0], (r) => {
        each(rgbs[1], (g) => {
            each(rgbs[2], (b) => {
                // if (count % redundant !== 0) {
                results.push(`${hex(r)}${hex(g)}${hex(b)}`);
                // }
                // count += 1;
            });
        });
    });
    return results;
}

