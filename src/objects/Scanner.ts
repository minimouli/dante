/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stream from 'stream'
import { WritableStream } from '@minimouli/io'
import { TokenType } from './Token'

type CallbackFn = (content: string) => void

class StringString extends stream.Writable {

    private callback: CallbackFn

    constructor(callback: CallbackFn) {
        super()

        this.callback = callback
    }

    _write(chunk: any, encoding: string, next: () => void): void {

        this.callback(chunk.toString())

        next()
    }

}

abstract class Scanner extends WritableStream {

    protected content = ''

    constructor() {
        super(new StringString(content => this.onContentAvailable(content)))
    }

    protected onContentAvailable(content: string): void {
        this.content += content
    }

    getTokens(): TokenType[] {
        return [...this.content].map(character => this.getToken(character))
    }

    protected getToken(character: string): TokenType {
        switch (character) {
            case '*':  return TokenType.PATH
            case 'o':  return TokenType.SOLUTION
            case '\n': return TokenType.NEWLINE
            default:   return TokenType.WALL
        }
    }

}

export default Scanner
