import { iteratee, identity, eachRight, sortedLastIndexBy } from 'lodash';

export class BinaryHeap<T> {
    nodes: T[] = [];
    iteratee: (value: T) => any = identity;

    constructor(iterateeFunc: string | object | ((value: T) => any) = identity) {
        this.iteratee = iteratee(iterateeFunc);
    }

    isEmpty() {
        return this.nodes.length === 0;
    }

    pop() {
        return this.nodes.shift();
    }

    insert(node: T) {
        const index = sortedLastIndexBy(this.nodes, node, this.iteratee);
        const value = this.iteratee(node);
        let found = false;

        eachRight(this.nodes.slice(0, index), (last) => {
            if (last === node) {
                found = true;
                return false;
            }
            if (this.iteratee(last) < value) {
                return false;
            }
        });
        if (!found) {
            this.nodes.splice(index, 0, node);
        }
    }

    indexOf(node: T) {
        let index = sortedLastIndexBy(this.nodes, node, this.iteratee);
        const value = this.iteratee(node);
        eachRight(this.nodes.slice(0, index), (last, i) => {
            if (last === node) {
                index = i;
                return false;
            }
            if (this.iteratee(last) < value) {
                index = -1;
                return false;
            }
        });
        return index;
    }

    remove(node: T) {
        const index = this.indexOf(node);
        if (index !== -1) {
            return this.nodes.splice(index, 1)[0];
        }
    }
}
