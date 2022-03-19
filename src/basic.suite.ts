/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable } from '@minimouli/framework'
import Maze from './objects/Maze'

suite('Basic generation', () => {

    test('Imperfect', async () => {

        const width = 50
        const height = 50

        const exec = new Executable('generator', [
            width.toString(), height.toString()
        ])

        const maze = new Maze(width, height)

        exec.pipeStdout(maze)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBeImperfect()
    })

    test('Perfect', async () => {

        const width = 50
        const height = 50

        const exec = new Executable('generator', [
            width.toString(), height.toString(), 'perfect'
        ])

        const maze = new Maze(width, height)

        exec.pipeStdout(maze)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBePerfect()
    })

})
