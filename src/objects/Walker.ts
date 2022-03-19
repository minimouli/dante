/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Node from './Node'

type Coordinates = {
    x: number,
    y: number
}

type Cell = {
    node: Node,
    from: Coordinates
}

class Walker {

    private start: Node

    constructor(start: Node) {
        this.start = start
    }

    /**
     * @returns the walk score of the graph.
     *
     * The walk score is the number of node that has been walked multiple times.
     * In case of perfect maze, the graph has no loop so the score is 0.
     * In case of imperfect maze, the graph has loop, so score must be > 0.
     */
    walk(): number {

        this.start.clear()

        let cells = [{
            node: this.start,
            from: { x: NaN, y: NaN }
        }]

        let score = 0

        while (cells.length) {

            const cell = cells.shift()

            if (cell === undefined)
                continue

            if (cell.node.hasBeenWalked) {
                score++
                continue
            }

            const indexOfParent = cell.node.branches.findIndex(branch => branch.x === cell.from.x && branch.y === cell.from.y)
            const branches = [...cell.node.branches]

            if (indexOfParent !== -1)
                branches.splice(indexOfParent, 1)

            cell.node.hasBeenWalked = true

            cells = [
                ...cells,
                ...branches.map(branch => ({ node: branch, from: { x: cell.node.x, y: cell.node.y } }))
            ]
        }

        return score
    }

}

export default Walker
