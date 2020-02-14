import { BinaryHeap } from './adt';

const testHeap = (small: any, middle: any, big: any, iterateeFunc) => {
    let heap = new BinaryHeap(iterateeFunc);
    heap.insert(middle);
    expect(heap.nodes).toEqual([middle]);
    heap.insert(big);
    expect(heap.nodes).toEqual([middle, big]);
    heap.insert(small);
    expect(heap.nodes).toEqual([small, middle, big]);
    expect(heap.indexOf(big)).toBe(2);
    expect(heap.indexOf(small)).toBe(0);

    expect(heap.isEmpty()).toBe(false);
    expect(heap.remove(middle)).toBe(middle);
    expect(heap.nodes).toEqual([small, big]);
    expect(heap.remove(middle)).toBe(undefined);
    expect(heap.nodes).toEqual([small, big]);
    expect(heap.remove(small)).toBe(small);
    expect(heap.nodes).toEqual([big]);
    expect(heap.remove(big)).toBe(big);
    expect(heap.nodes).toEqual([]);
    expect(heap.isEmpty()).toBe(true);
}

describe('adt test', () => {
    test('BinaryHeap', () => {
        testHeap(0, 1, 3, (a: number) => a);
        testHeap({v: 0}, {v: 1}, {v: 3}, 'v');
    });
});

