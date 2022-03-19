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

class Solver {

    private start: Node

    constructor(start: Node) {
        this.start = start
    }

    solve(x: number, y: number): boolean {

        this.start.clear()

        let cells = [{
            node: this.start,
            from: { x: NaN, y: NaN }
        }]

        while (cells.length) {

            const cell = cells.shift()

            if (cell === undefined)
                continue

            // the final node has been reached
            if (cell.node.x === x - 1 && cell.node.y === y - 1)
                return true

            const indexOfParent = cell.node.branches.findIndex(branch => branch.x === cell.from.x && branch.y === cell.from.y)
            let branches = [...cell.node.branches]

            if (indexOfParent !== -1)
                branches.splice(indexOfParent, 1)

            branches = branches.filter(node => node.isSolution && !node.hasBeenWalked)

            cell.node.hasBeenWalked = true

            cells = [
                ...cells,
                ...branches.map(branch => ({ node: branch, from: { x: cell.node.x, y: cell.node.y } }))
            ]
        }

        return false
    }

}

export default Solver
