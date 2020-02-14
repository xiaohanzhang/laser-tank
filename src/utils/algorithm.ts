import { reverse } from 'lodash';

import { BinaryHeap } from './adt';

const reconstructPath = (cameFrom: {[key: string]: string}, current: string) => {
    const path = [current];
    while (current in cameFrom) {
        current = cameFrom[current];
        path.push(current);
    }
    return reverse(path);
}

interface AStarNode {
    id: string,
    gScore: number, // the cost of the cheapest path from start to current node
    fScore: number, // the gScore + heuristic cost to goal
}

// h(n) estimates the cost to reach goal from node n.
export const aStar = (
    start: string, goal: string, fScore: number,
    forEachNeighbor: (
        p1: string, callback: (neighbor: string, gScore: number, hScore: number) => void
    ) => void
) => {
    const nodes: {[key: string]: AStarNode} = {};
    nodes[start] = {id: start, gScore: 0, fScore, };

    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    const heap = new BinaryHeap<AStarNode>('fScore');
    heap.insert(nodes[start]);

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start to n currently known.
    const cameFrom: {[key: string]: string} = {};

    while (!heap.isEmpty()) {
        const node = heap.pop() as AStarNode; 
        if (node.id === goal) {
            return reconstructPath(cameFrom, node.id);
        }
        forEachNeighbor(node.id, (neighbor, g, hScore) => {
            const gScore = node.gScore + g;
            const fScore = gScore + hScore;
            if (!(neighbor in nodes)) {
                nodes[neighbor] = { id: neighbor, gScore, fScore, };
                cameFrom[neighbor] = node.id;
                heap.insert(nodes[neighbor]);
            } else if (gScore < nodes[neighbor].gScore) {
                // This path to neighbor is better than any previous one. Record it!
                cameFrom[neighbor] = node.id;
                heap.remove(nodes[neighbor]);
                nodes[neighbor].gScore = gScore;
                nodes[neighbor].fScore = fScore;
                heap.insert(nodes[neighbor]);
            }
        });
    }
    // can not find a path
    return false;
}
