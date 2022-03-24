/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable } from '@minimouli/framework'
import Maze from './objects/Maze'

suite('Big size generation', () => {

    test('500x500', async () => {

        const width = 500
        const height = 500

        const exec = new Executable('generator', [
            width.toString(), height.toString(), 'perfect'
        ])

        const maze = new Maze(width, height)

        exec.pipeStdout(maze)
        exec.setTimeout(15000)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBePerfect()
    })

    test('1000x1000', async () => {

        const width = 1000
        const height = 1000

        const exec = new Executable('generator', [
            width.toString(), height.toString(), 'perfect'
        ])

        const maze = new Maze(width, height)

        exec.pipeStdout(maze)
        exec.setTimeout(15000)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBePerfect()
    })

    test('2000x2000', async () => {

        const width = 2000
        const height = 2000

        const exec = new Executable('generator', [
            width.toString(), height.toString(), 'perfect'
        ])

        const maze = new Maze(width, height)

        exec.pipeStdout(maze)
        exec.setTimeout(15000)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBePerfect()
    })

    test('3000x3000', async () => {

        const width = 3000
        const height = 3000

        const exec = new Executable('generator', [
            width.toString(), height.toString(), 'perfect'
        ])

        const maze = new Maze(width, height)

        exec.pipeStdout(maze)
        exec.setTimeout(15000)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBePerfect()
    })

})
