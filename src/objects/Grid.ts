/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExpectError } from '@minimouli/framework'
import { Hints } from '@minimouli/types'
import { TokenType } from './Token'

const indexOf = <T>(array: T[], needle: T, start: number = 0): number => {

    for (let i = start; i < array.length; i++) {
        if (array[i] === needle)
            return i
    }

    return -1
}

class Grid {

    readonly width: number
    readonly height: number

    private tokens: TokenType[] = []
    private _hasInitiallyATrailingLine = false

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    concat(tokens: TokenType[]): void {
        this.tokens = [
            ...this.tokens,
            ...tokens
        ]
    }

    format(): void {

        if (this.tokens[this.tokens.length - 1] === TokenType.NEWLINE) {
            this._hasInitiallyATrailingLine = true
            return
        }

        this.tokens.push(TokenType.NEWLINE)
    }

    at(x: number, y: number): TokenType {

        const cell = this.tokens[y * (this.width + 1) + x]

        if (cell === undefined)
            return TokenType.NONE

        return cell
    }

    private getWidthOfEachLines(): number[] {

        const widths = []

        let offset = 0
        let index = 0

        while ((index = indexOf(this.tokens, TokenType.NEWLINE, offset)) !== -1) {
            widths.push(index - offset)
            offset = index + 1
        }

        return widths
    }

    checkWidthToBe(width: number): void {

        const widths = this.getWidthOfEachLines()
        const invalidWidth = widths.find(n => n !== width)

        if (invalidWidth === undefined)
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            category: Hints.HintCategory.OUTPUT,
            message: 'The maze has an invalid width.',
            received: {
                value: invalidWidth.toString(),
                type: Hints.ObjectType.NUMBER
            },
            expected: {
                value: width.toString(),
                type: Hints.ObjectType.NUMBER
            }
        }

        throw new ExpectError(hint)
    }

    checkHeightToBe(height: number): void {

        let counter = this.tokens.filter(token => token === TokenType.NEWLINE).length

        if (counter === height)
            return

        const hint: Hints.EqualHint = {
            type: Hints.HintType.EQUAL,
            status: Hints.HintStatus.FAILURE,
            category: Hints.HintCategory.OUTPUT,
            message: 'The maze has an invalid height.',
            received: {
                value: counter.toString(),
                type: Hints.ObjectType.NUMBER
            },
            expected: {
                value: height.toString(),
                type: Hints.ObjectType.NUMBER
            }
        }

        throw new ExpectError(hint)
    }

    get hasInitiallyATrailingLine(): boolean {
        return this._hasInitiallyATrailingLine
    }

}

export default Grid
