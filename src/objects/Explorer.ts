/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Grid from './Grid'
import Node from './Node'
import { TokenType } from './Token'

type Coordinates = {
    x: number,
    y: number
}

type Cell = Coordinates & {
    parent: Node,
    from: Coordinates
}

class NodeMap {

    private map: { [coordinates: string]: Node } = {}

    register(coordinates: Coordinates, node: Node): void {
        this.map[`${coordinates.x}-${coordinates.y}`] = node
    }

    get(coordinates: Coordinates): Node {
        return this.map[`${coordinates.x}-${coordinates.y}`]
    }

    has(coordinates: Coordinates): boolean {
        return this.get(coordinates) !== undefined
    }

}

class Explorer {

    private grid: Grid

    constructor(grid: Grid) {
        this.grid = grid
    }

    explore(): Node {

        const start = new Node(-1, -1)

        const visited = Array.from({ length: this.width }, e => Array(this.height).fill(false))
        const cells: Cell[] = []
        const map = new NodeMap()

        cells.push({
            x: 0, y: 0,
            parent: start,
            from: {
                x: -1, y: -1
            }
        })
        visited[0][0] = true

        const directions = [
            { x: -1, y: 0 },
            { x: +1, y: 0 },
            { x: 0,  y: -1 },
            { x: 0,  y: +1 }
        ]

        const isFreeSpace = (token: TokenType) => [TokenType.PATH, TokenType.SOLUTION].includes(token)

        while (cells.length) {

            const element = cells.shift()

            if (element === undefined)
                continue

            const branches = directions.reduce((counter, direction) => {

                const i = element.x + direction.x
                const j = element.y + direction.y

                return counter + (+isFreeSpace(this.grid.at(i, j)))
            }, 0)

            const node = new Node(element.x, element.y)

            element.parent.addBranch(node)
            node.addBranch(element.parent)

            if (this.grid.at(element.x, element.y) === TokenType.SOLUTION)
                node.isSolution = true

            map.register({ x: element.x, y: element.y }, node)

            directions.forEach(direction => {

                const i = element.x + direction.x
                const j = element.y + direction.y

                if (!isFreeSpace(this.grid.at(i, j)))
                    return

                if (visited[i][j]) {

                    // dont go back
                    if (element.from.x === i && element.from.y === j)
                        return

                    if (map.has({ x: i, y: j })) {

                        const neighboor = map.get({ x: i, y: j })

                        node.addBranch(neighboor)
                        neighboor.addBranch(node)
                    }

                    return
                }

                cells.push({ x: i, y: j, parent: node, from: element })
                visited[i][j] = true
            })
        }

        return start
    }

    get width(): number {
        return this.grid.width
    }

    get height(): number {
        return this.grid.height
    }

}

export default Explorer
