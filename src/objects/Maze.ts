/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExpectError } from '@minimouli/framework'
import { Hints } from '@minimouli/types'
import Explorer from './Explorer'
import Grid from './Grid'
import Node from './Node'
import Scanner from './Scanner'
import Solver from './Solver'
import Walker from './Walker'
import { TokenType } from './Token'

class Maze extends Scanner {

    private grid: Grid
    protected start: Node | null = null

    constructor(width: number, height: number) {
        super()

        this.grid = new Grid(width, height)
    }

    createGraph(): void {

        this.grid.concat(this.getTokens())
        this.grid.format()

        const explorer = new Explorer(this.grid)

        this.start = explorer.explore()
    }

    checkSizeToBe(width: number, height: number): void {
        this.grid.checkWidthToBe(width)
        this.grid.checkHeightToBe(height)
    }

    checkToBeImperfect(): void {

        if (!this.start)
            return

        const walker = new Walker(this.start)
        const score = walker.walk()

        if (score > 0)
            return

        const hint: Hints.CompHint = {
            type: Hints.HintType.COMP,
            status: Hints.HintStatus.FAILURE,
            message: 'The maze must be imperfect but is not.',
            symbol: Hints.CompSymbol.GREATER_THAN,
            received: {
                value: score.toString(),
                type: Hints.ObjectType.NUMBER
            },
            expected: {
                value: '0',
                type: Hints.ObjectType.NUMBER
            }
        }

        throw new ExpectError(hint)
    }

    checkToBePerfect(): void {

        if (!this.start)
            return

        const walker = new Walker(this.start)
        const score = walker.walk()

        if (score == 0)
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            message: 'The maze must be perfect but is not.',
            received: {
                value: score.toString(),
                type: Hints.ObjectType.NUMBER
            },
            expected: {
                value: '0',
                type: Hints.ObjectType.NUMBER
            }
        }

        throw new ExpectError(hint)
    }

    checkToBeSolved(): void {

        if (!this.start)
            return

        const solver = new Solver(this.start)
        const isSolved = solver.solve(this.grid.width, this.grid.height)

        if (isSolved)
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            message: 'The maze is not solved.',
            received: {
                value: 'The final cell has not been reached.',
                type: Hints.ObjectType.STRING
            }
        }

        throw new ExpectError(hint)
    }

    checkToHaveSameStructureOf(other: Maze): void {

        const start1 = this.start
        const start2 = other.start

        if (!start1 || !start2)
            return

        start1.clear()
        start2.clear()

        if (start1.match(start2))
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            category: Hints.HintCategory.OUTPUT,
            message: 'The solved maze does not have the same structure as the generated maze.',
            received: {
                value: 'Structure different.',
                type: Hints.ObjectType.STRING
            }
        }

        throw new ExpectError(hint)
    }

    checkHasATrailingLine(): void {

        if (this.grid.hasInitiallyATrailingLine)
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            category: Hints.HintCategory.OUTPUT,
            message: 'The output must have a trailing line at the end.',
            received: {
                value: '',
                type: Hints.ObjectType.STRING
            },
            expected: {
                value: '\\n',
                type: Hints.ObjectType.STRING
            }
        }

        throw new ExpectError(hint)
    }

    checkHasNoTrailingLine(): void {

        if (!this.grid.hasInitiallyATrailingLine)
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            category: Hints.HintCategory.OUTPUT,
            message: 'The output must not have a trailing line at the end.',
            received: {
                value: '\\n',
                type: Hints.ObjectType.STRING
            },
            expected: {
                value: '',
                type: Hints.ObjectType.STRING
            }
        }

        throw new ExpectError(hint)
    }

}

export default Maze
