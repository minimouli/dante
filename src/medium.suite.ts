/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable } from '@minimouli/framework'
import Maze from './objects/Maze'

suite('Medium size generation', () => {

    test('150x150', async () => {

        const width = 150
        const height = 150

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

    test('200x200', async () => {

        const width = 200
        const height = 200

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
