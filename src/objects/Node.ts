/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type Tuple = {
    one: Node,
    two: Node
}

class Node {

    readonly x: number
    readonly y: number

    readonly branches: Node[] = []

    hasBeenWalked: boolean = false
    isSolution: boolean = false

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    addBranch(node: Node): void {
        this.branches.push(node)
    }

    equals(other: Node): boolean {

        if (this.x !== other.x)
            return false

        if (this.y !== other.y)
            return false

        if (this.branches.length !== other.branches.length)
            return false

        return true
    }

    match(other: Node): boolean {

        const tuples: Tuple[] = [{
            one: this,
            two: other
        }]

        while (tuples.length) {

            const tuple = tuples.shift()

            if (tuple === undefined)
                continue

            const { one, two } = tuple

            if (!one.equals(two))
                return false

            one.branches.forEach((branch, index) => {

                if (branch.hasBeenWalked)
                    return

                tuples.push({
                    one: branch,
                    two: two.branches[index]
                })

                branch.hasBeenWalked = true
            })
        }

        return true
    }

    clear(): void {

        const nodes: Node[] = [this]
        this.hasBeenWalked = false

        while (nodes.length) {

            const node = nodes.shift()

            if (node === undefined)
                continue

            node.branches.forEach(branch => {

                if (!branch.hasBeenWalked)
                    return

                nodes.push(branch)
                branch.hasBeenWalked = false
            })
        }
    }

}

export default Node
